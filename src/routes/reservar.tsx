import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { z } from "zod";
import {
  Check,
  ChevronLeft,
  ChevronRight,
  Clock,
  Calendar as CalendarIcon,
  Sparkles,
} from "lucide-react";
import {
  SERVICES,
  SPECIALISTS,
  AVAILABLE_HOURS,
  WHATSAPP_NUMBER,
  SALON_NAME,
  formatPrice,
  type Service,
  type Specialist,
} from "@/lib/salon-data";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { WhatsAppIcon } from "@/components/site/WhatsAppIcon";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { es } from "date-fns/locale";

const searchSchema = z.object({
  service: z.string().optional(),
});

export const Route = createFileRoute("/reservar")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Reserva tu cita — Maison Marín" },
      {
        name: "description",
        content: "Reserva online tu cita en Maison Marín en 4 sencillos pasos.",
      },
    ],
  }),
  component: BookingPage,
});

const STEPS = ["Servicio", "Especialista", "Fecha y hora", "Tus datos"] as const;

function BookingPage() {
  const { service: initialService } = Route.useSearch();
  const [step, setStep] = useState(0);
  const [service, setService] = useState<Service | null>(
    SERVICES.find((s) => s.id === initialService) ?? null,
  );
  const [specialist, setSpecialist] = useState<Specialist | null>(null);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [time, setTime] = useState<string | null>(null);
  const [details, setDetails] = useState({ name: "", phone: "", notes: "" });
  const [confirmed, setConfirmed] = useState(false);

  const canNext = useMemo(() => {
    if (step === 0) return !!service;
    if (step === 1) return !!specialist;
    if (step === 2) return !!date && !!time;
    if (step === 3) return details.name.trim().length > 1 && details.phone.trim().length > 5;
    return false;
  }, [step, service, specialist, date, time, details]);

  /**
   * Builds the WhatsApp message from all booking state fields,
   * encodes it, and opens the wa.me link in a new tab — no page reload.
   */
  const openWhatsApp = ({
    svc,
    spec,
    d,
    t,
    det,
  }: {
    svc: Service;
    spec: Specialist;
    d: Date;
    t: string;
    det: { name: string; phone: string; notes: string };
  }) => {
    const formattedDate = format(d, "EEEE d 'de' MMMM y", { locale: es });
    const rawMessage = [
      `Hola ${SALON_NAME} 👋`,
      ``,
      `Quiero confirmar mi cita:`,
      `• Nombre: ${det.name}`,
      `• Teléfono: ${det.phone}`,
      `• Servicio: ${svc.name} (${formatPrice(svc.price)})`,
      `• Especialista: ${spec.name}`,
      `• Fecha: ${formattedDate}`,
      `• Hora: ${t}`,
      ...(det.notes ? [`• Notas: ${det.notes}`] : []),
      ``,
      `¡Gracias! 🌸`,
    ].join("\n");

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(rawMessage)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const goNext = () => {
    if (!canNext) return;
    if (step === 3 && service && specialist && date && time) {
      setConfirmed(true);
      openWhatsApp({ svc: service, spec: specialist, d: date, t: time, det: details });
      return;
    }
    setStep((s) => s + 1);
  };
  const goBack = () => setStep((s) => Math.max(0, s - 1));

  if (confirmed && service && specialist && date && time) {
    return (
      <div className="flex min-h-screen flex-col bg-background">
        <SiteHeader />
        <main className="flex-1">
          <ConfirmationScreen
            service={service}
            specialist={specialist}
            date={date}
            time={time}
            details={details}
          />
        </main>
        <SiteFooter />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main className="flex-1 bg-gradient-luxe">
        <div className="mx-auto max-w-4xl px-6 py-16 md:py-24">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-background/60 px-3 py-1.5 text-xs uppercase tracking-[0.25em] text-foreground/70">
              <Sparkles className="h-3.5 w-3.5 text-gold" />
              Reserva en 4 pasos
            </div>
            <h1 className="mt-6 font-display text-4xl leading-tight md:text-6xl">
              Agenda tu cita
            </h1>
            <p className="mt-3 text-sm text-muted-foreground">
              Confirma en segundos por WhatsApp.
            </p>
          </div>

          <Stepper current={step} />

          <div className="mt-10 rounded-[2rem] border border-border/60 bg-card p-6 shadow-luxe md:p-10">
            {step === 0 && (
              <StepServices selected={service} onSelect={setService} />
            )}
            {step === 1 && (
              <StepSpecialists selected={specialist} onSelect={setSpecialist} />
            )}
            {step === 2 && (
              <StepDateTime
                date={date}
                setDate={setDate}
                time={time}
                setTime={setTime}
              />
            )}
            {step === 3 && <StepDetails details={details} setDetails={setDetails} />}

            <div className="mt-10 flex items-center justify-between border-t border-border/60 pt-6">
              <button
                onClick={goBack}
                disabled={step === 0}
                className="inline-flex items-center gap-1 rounded-full border border-border px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-secondary disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ChevronLeft className="h-4 w-4" /> Atrás
              </button>
              <button
                onClick={goNext}
                disabled={!canNext}
                className={cn(
                  "inline-flex items-center gap-1 rounded-full px-6 py-2.5 text-sm font-medium transition-all",
                  canNext
                    ? "bg-primary text-primary-foreground shadow-soft hover:-translate-y-0.5 hover:shadow-luxe"
                    : "bg-muted text-muted-foreground",
                )}
              >
                {step === 3 ? "Confirmar cita" : "Continuar"}
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          {service && (
            <Summary
              service={service}
              specialist={specialist}
              date={date}
              time={time}
            />
          )}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}

function Stepper({ current }: { current: number }) {
  return (
    <div className="mt-10 flex items-center justify-center gap-2 md:gap-4">
      {STEPS.map((label, i) => (
        <div key={label} className="flex items-center gap-2 md:gap-4">
          <div className="flex flex-col items-center">
            <div
              className={cn(
                "grid h-9 w-9 place-items-center rounded-full border text-sm font-medium transition-all",
                i < current && "border-gold bg-gold text-primary-foreground",
                i === current && "border-primary bg-primary text-primary-foreground",
                i > current && "border-border bg-background text-muted-foreground",
              )}
            >
              {i < current ? <Check className="h-4 w-4" /> : i + 1}
            </div>
            <div
              className={cn(
                "mt-2 hidden text-[10px] uppercase tracking-[0.2em] md:block",
                i === current ? "text-foreground" : "text-muted-foreground",
              )}
            >
              {label}
            </div>
          </div>
          {i < STEPS.length - 1 && (
            <div
              className={cn(
                "h-px w-8 md:w-16",
                i < current ? "bg-gold" : "bg-border",
              )}
            />
          )}
        </div>
      ))}
    </div>
  );
}

function StepServices({
  selected,
  onSelect,
}: {
  selected: Service | null;
  onSelect: (s: Service) => void;
}) {
  return (
    <div>
      <h2 className="font-display text-2xl md:text-3xl">Elige tu servicio</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Selecciona el ritual que deseas experimentar.
      </p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {SERVICES.map((s) => {
          const active = selected?.id === s.id;
          return (
            <button
              key={s.id}
              onClick={() => onSelect(s)}
              className={cn(
                "group flex items-center gap-4 rounded-2xl border p-4 text-left transition-all",
                active
                  ? "border-primary bg-secondary shadow-soft"
                  : "border-border bg-background hover:border-foreground/30",
              )}
            >
              <img
                src={s.image}
                alt={s.name}
                loading="lazy"
                className="h-20 w-20 flex-shrink-0 rounded-xl object-cover"
              />
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <div className="font-display text-lg">{s.name}</div>
                  <div className="text-sm font-medium">{formatPrice(s.price)}</div>
                </div>
                <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">
                  {s.description}
                </p>
                <div className="mt-2 flex items-center gap-1 text-[11px] text-muted-foreground">
                  <Clock className="h-3 w-3" /> {s.duration} min
                </div>
              </div>
              <div
                className={cn(
                  "grid h-6 w-6 flex-shrink-0 place-items-center rounded-full border transition-all",
                  active
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border",
                )}
              >
                {active && <Check className="h-3.5 w-3.5" />}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function StepSpecialists({
  selected,
  onSelect,
}: {
  selected: Specialist | null;
  onSelect: (s: Specialist) => void;
}) {
  return (
    <div>
      <h2 className="font-display text-2xl md:text-3xl">Elige a tu especialista</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Cada una con su firma y talento único.
      </p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {SPECIALISTS.map((p) => {
          const active = selected?.id === p.id;
          return (
            <button
              key={p.id}
              onClick={() => onSelect(p)}
              className={cn(
                "group overflow-hidden rounded-2xl border text-left transition-all",
                active
                  ? "border-primary shadow-luxe"
                  : "border-border hover:border-foreground/30 hover:shadow-soft",
              )}
            >
              <div className="aspect-[3/4] overflow-hidden">
                <img
                  src={p.photo}
                  alt={p.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-4">
                <div className="font-display text-base">{p.name}</div>
                <div className="mt-0.5 text-xs text-muted-foreground">{p.specialty}</div>
                <div className="mt-2 flex items-center justify-between text-[11px] text-muted-foreground">
                  <span>{p.years} años</span>
                  <span>★ {p.rating.toFixed(1)}</span>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function StepDateTime({
  date,
  setDate,
  time,
  setTime,
}: {
  date: Date | undefined;
  setDate: (d: Date | undefined) => void;
  time: string | null;
  setTime: (t: string) => void;
}) {
  return (
    <div>
      <h2 className="font-display text-2xl md:text-3xl">Elige fecha y hora</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Selecciona el día y horario que mejor te convenga.
      </p>

      <div className="mt-8 grid gap-8 md:grid-cols-2">
        <div className="rounded-2xl border border-border bg-background p-4">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            disabled={(d) => d < new Date(new Date().setHours(0, 0, 0, 0))}
            locale={es}
            className="pointer-events-auto"
          />
        </div>

        <div>
          <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Horarios disponibles
          </div>
          <div className="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-4">
            {AVAILABLE_HOURS.map((h) => (
              <button
                key={h}
                onClick={() => setTime(h)}
                disabled={!date}
                className={cn(
                  "rounded-full border px-2 py-2.5 text-sm transition-all",
                  time === h
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-background hover:border-foreground/40",
                  !date && "cursor-not-allowed opacity-40",
                )}
              >
                {h}
              </button>
            ))}
          </div>
          {!date && (
            <p className="mt-4 text-xs text-muted-foreground">
              Selecciona primero una fecha.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

function StepDetails({
  details,
  setDetails,
}: {
  details: { name: string; phone: string; notes: string };
  setDetails: (d: { name: string; phone: string; notes: string }) => void;
}) {
  return (
    <div>
      <h2 className="font-display text-2xl md:text-3xl">Tus datos</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Últimos detalles para confirmar tu cita.
      </p>
      <div className="mt-8 grid gap-5 md:grid-cols-2">
        <Field label="Nombre completo">
          <input
            value={details.name}
            onChange={(e) => setDetails({ ...details, name: e.target.value })}
            placeholder="Ana Paula García"
            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-primary"
          />
        </Field>
        <Field label="WhatsApp">
          <input
            value={details.phone}
            onChange={(e) => setDetails({ ...details, phone: e.target.value })}
            placeholder="+52 55 1234 5678"
            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-primary"
          />
        </Field>
        <div className="md:col-span-2">
          <Field label="Notas (opcional)">
            <textarea
              value={details.notes}
              onChange={(e) => setDetails({ ...details, notes: e.target.value })}
              rows={4}
              placeholder="Comparte referencias, alergias o preferencias..."
              className="w-full resize-none rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-primary"
            />
          </Field>
        </div>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs uppercase tracking-[0.2em] text-muted-foreground">
        {label}
      </span>
      {children}
    </label>
  );
}

function Summary({
  service,
  specialist,
  date,
  time,
}: {
  service: Service;
  specialist: Specialist | null;
  date: Date | undefined;
  time: string | null;
}) {
  return (
    <div className="mt-6 rounded-2xl border border-border/60 bg-background/70 p-5 backdrop-blur">
      <div className="text-xs uppercase tracking-[0.2em] text-gold">Resumen</div>
      <div className="mt-3 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
        <span className="font-medium">{service.name}</span>
        <span className="text-muted-foreground">· {formatPrice(service.price)}</span>
        {specialist && (
          <span className="text-muted-foreground">· con {specialist.name}</span>
        )}
        {date && (
          <span className="text-muted-foreground">
            · {format(date, "EEEE d 'de' MMMM", { locale: es })}
          </span>
        )}
        {time && <span className="text-muted-foreground">· {time}</span>}
      </div>
    </div>
  );
}

function ConfirmationScreen({
  service,
  specialist,
  date,
  time,
  details,
}: {
  service: Service;
  specialist: Specialist;
  date: Date;
  time: string;
  details: { name: string; phone: string; notes: string };
}) {
  const handleResendWhatsApp = () => {
    const formattedDate = format(date, "EEEE d 'de' MMMM y", { locale: es });
    const rawMessage = [
      `Hola ${SALON_NAME} 👋`,
      ``,
      `Quiero confirmar mi cita:`,
      `• Nombre: ${details.name}`,
      `• Teléfono: ${details.phone}`,
      `• Servicio: ${service.name} (${formatPrice(service.price)})`,
      `• Especialista: ${specialist.name}`,
      `• Fecha: ${formattedDate}`,
      `• Hora: ${time}`,
      ...(details.notes ? [`• Notas: ${details.notes}`] : []),
      ``,
      `¡Gracias! 🌸`,
    ].join("\n");

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(rawMessage)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="mx-auto max-w-3xl px-6 py-16 md:py-24">
      <div className="rounded-[2rem] border border-border/60 bg-card p-8 text-center shadow-luxe md:p-14">
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-gold/15 text-gold">
          <Check className="h-8 w-8" />
        </div>
        <div className="mt-6 text-xs uppercase tracking-[0.3em] text-gold">
          Cita solicitada
        </div>
        <h1 className="mt-3 font-display text-4xl leading-tight md:text-5xl">
          ¡Nos vemos pronto, {details.name.split(" ")[0]}!
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Recibirás una confirmación por WhatsApp. Envíanos tu resumen con un toque.
        </p>

        <div className="mx-auto mt-10 max-w-md rounded-2xl border border-border/60 bg-secondary/60 p-6 text-left">
          <Row icon={<Sparkles className="h-4 w-4" />} label="Servicio" value={`${service.name} · ${formatPrice(service.price)}`} />
          <Row icon={<Check className="h-4 w-4" />} label="Especialista" value={specialist.name} />
          <Row icon={<CalendarIcon className="h-4 w-4" />} label="Fecha" value={format(date, "EEEE d 'de' MMMM y", { locale: es })} />
          <Row icon={<Clock className="h-4 w-4" />} label="Hora" value={time} />
        </div>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <button
            onClick={handleResendWhatsApp}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-luxe"
          >
            <WhatsAppIcon className="h-4 w-4" /> Enviar por WhatsApp
          </button>
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full border border-border px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
          >
            Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  );
}

function Row({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-border/60 py-3 last:border-b-0">
      <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">
        <span className="text-gold">{icon}</span> {label}
      </div>
      <div className="text-sm font-medium">{value}</div>
    </div>
  );
}
