import { createFileRoute } from "@tanstack/react-router";
import { SALON_NAME } from "@/lib/salon-data";

export const Route = createFileRoute("/admin/configuracion")({
  component: SettingsPage,
});

function SettingsPage() {
  return (
    <div className="space-y-8">
      <div>
        <div className="text-xs uppercase tracking-[0.25em] text-gold">Configuración</div>
        <h1 className="mt-1 font-display text-3xl md:text-4xl">Preferencias del salón</h1>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card title="Información general" description="Datos que verán tus clientas.">
          <Field label="Nombre del salón" defaultValue={SALON_NAME} />
          <Field label="Teléfono / WhatsApp" defaultValue="+52 55 1234 5678" />
          <Field label="Dirección" defaultValue="Av. Presidente Masaryk 305, Polanco" />
        </Card>

        <Card title="Horarios" description="Cuándo aceptas reservas.">
          <Row label="Lunes – Viernes" value="09:00 – 20:00" />
          <Row label="Sábado" value="09:00 – 19:00" />
          <Row label="Domingo" value="Cerrado" />
        </Card>

        <Card title="Notificaciones" description="Cómo te avisamos.">
          <Toggle label="Nuevas reservas" defaultChecked />
          <Toggle label="Cancelaciones" defaultChecked />
          <Toggle label="Reportes semanales" />
          <Toggle label="Cumpleaños de clientas" defaultChecked />
        </Card>

        <Card title="Facturación" description="Plan y método de pago.">
          <div className="rounded-xl border border-gold/40 bg-gold/10 p-4">
            <div className="text-xs uppercase tracking-[0.2em] text-gold">Plan actual</div>
            <div className="mt-1 font-display text-xl">Atelier · Pro</div>
            <div className="mt-1 text-xs text-muted-foreground">$899 MXN / mes · próximo cobro en 12 días</div>
          </div>
          <button className="w-full rounded-full border border-border bg-background py-2.5 text-sm font-medium transition-colors hover:bg-secondary">
            Cambiar plan
          </button>
        </Card>

        <Card title="Integraciones" description="Conecta tus herramientas.">
          <Integration name="WhatsApp Business" status="Conectado" active />
          <Integration name="Google Calendar" status="Conectado" active />
          <Integration name="Instagram" status="Desconectado" />
          <Integration name="Stripe" status="Conectado" active />
        </Card>

        <Card title="Equipo" description="Personal con acceso.">
          <Row label="Regina M." value="Owner" />
          <Row label="Sofía H." value="Admin" />
          <Row label="Camila R." value="Especialista" />
          <Row label="Valentina L." value="Especialista" />
        </Card>
      </div>
    </div>
  );
}

function Card({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-border/60 bg-card p-6 shadow-soft">
      <h3 className="font-display text-lg">{title}</h3>
      <p className="mt-1 text-xs text-muted-foreground">{description}</p>
      <div className="mt-5 space-y-3">{children}</div>
    </div>
  );
}

function Field({ label, defaultValue }: { label: string; defaultValue: string }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
        {label}
      </span>
      <input
        defaultValue={defaultValue}
        className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm outline-none transition-colors focus:border-primary"
      />
    </label>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between border-b border-border/60 py-2 text-sm last:border-b-0">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}

function Toggle({ label, defaultChecked }: { label: string; defaultChecked?: boolean }) {
  return (
    <label className="flex cursor-pointer items-center justify-between py-1.5 text-sm">
      <span>{label}</span>
      <span className="relative inline-flex">
        <input type="checkbox" defaultChecked={defaultChecked} className="peer sr-only" />
        <span className="h-6 w-11 rounded-full bg-border transition-colors peer-checked:bg-primary" />
        <span className="absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-background shadow transition-transform peer-checked:translate-x-5" />
      </span>
    </label>
  );
}

function Integration({ name, status, active }: { name: string; status: string; active?: boolean }) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-border/60 bg-background p-3">
      <div>
        <div className="text-sm font-medium">{name}</div>
        <div className="text-[11px] text-muted-foreground">{status}</div>
      </div>
      <button
        className={
          active
            ? "rounded-full border border-border px-3 py-1.5 text-xs text-muted-foreground hover:bg-secondary"
            : "rounded-full bg-primary px-3 py-1.5 text-xs text-primary-foreground hover:bg-primary/90"
        }
      >
        {active ? "Configurar" : "Conectar"}
      </button>
    </div>
  );
}
