import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Filter, Plus } from "lucide-react";
import { APPOINTMENTS, formatPrice, AVAILABLE_HOURS, SPECIALISTS } from "@/lib/salon-data";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/admin/agenda")({
  component: AgendaPage,
});

const FILTERS = ["Todas", "Confirmadas", "Pendientes", "Canceladas"] as const;
const FILTER_MAP: Record<(typeof FILTERS)[number], string | null> = {
  Todas: null,
  Confirmadas: "confirmed",
  Pendientes: "pending",
  Canceladas: "canceled",
};

function AgendaPage() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("Todas");

  const activeDate = date ? date.toISOString().slice(0, 10) : "";
  const status = FILTER_MAP[filter];
  const rows = APPOINTMENTS.filter((a) => a.date === activeDate).filter((a) =>
    status ? a.status === status : true,
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="text-xs uppercase tracking-[0.25em] text-gold">Agenda</div>
          <h1 className="mt-1 font-display text-3xl md:text-4xl">Citas</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Gestiona la agenda diaria del salón.
          </p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-all hover:-translate-y-0.5 hover:shadow-luxe">
          <Plus className="h-4 w-4" /> Nueva cita
        </button>
      </div>

      <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
        <div className="space-y-6">
          <div className="rounded-2xl border border-border/60 bg-card p-4 shadow-soft">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              locale={es}
              className="pointer-events-auto"
            />
          </div>

          <div className="rounded-2xl border border-border/60 bg-card p-5 shadow-soft">
            <h3 className="font-display text-base">Especialistas del día</h3>
            <div className="mt-4 space-y-3">
              {SPECIALISTS.map((s) => (
                <div key={s.id} className="flex items-center gap-3">
                  <img src={s.photo} alt={s.name} className="h-9 w-9 rounded-full object-cover" />
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm font-medium">{s.name}</div>
                    <div className="truncate text-[11px] text-muted-foreground">{s.specialty}</div>
                  </div>
                  <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.15em] text-emerald-700">
                    Activa
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border/60 bg-card p-4 shadow-soft">
            <div>
              <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                {date ? format(date, "EEEE d 'de' MMMM y", { locale: es }) : "Sin fecha"}
              </div>
              <div className="mt-1 font-display text-xl">{rows.length} citas</div>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              {FILTERS.map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={cn(
                    "rounded-full border px-3 py-1.5 text-xs transition-all",
                    filter === f
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-background text-muted-foreground hover:text-foreground",
                  )}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl border border-border/60 bg-card shadow-soft">
            <div className="grid grid-cols-[80px_1.4fr_1fr_1fr_100px_120px] gap-4 border-b border-border/60 bg-secondary/60 px-6 py-3 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              <div>Hora</div>
              <div>Cliente</div>
              <div>Servicio</div>
              <div>Especialista</div>
              <div className="text-right">Total</div>
              <div className="text-right">Estado</div>
            </div>
            {rows.length === 0 ? (
              <div className="py-14 text-center text-sm text-muted-foreground">
                No hay citas para este día.
              </div>
            ) : (
              rows.map((a) => (
                <div
                  key={a.id}
                  className="grid grid-cols-[80px_1.4fr_1fr_1fr_100px_120px] items-center gap-4 border-b border-border/60 px-6 py-4 text-sm last:border-b-0 hover:bg-secondary/40"
                >
                  <div className="font-display text-base">{a.time}</div>
                  <div className="font-medium">{a.clientName}</div>
                  <div className="text-muted-foreground">{a.serviceName}</div>
                  <div className="text-muted-foreground">{a.specialistName}</div>
                  <div className="text-right font-medium">{formatPrice(a.price)}</div>
                  <div className="flex justify-end">
                    <StatusBadge status={a.status} />
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="rounded-2xl border border-border/60 bg-card p-5 shadow-soft">
            <h3 className="font-display text-base">Horarios disponibles</h3>
            <div className="mt-4 grid grid-cols-4 gap-2 sm:grid-cols-6 lg:grid-cols-9">
              {AVAILABLE_HOURS.map((h) => {
                const busy = rows.some((r) => r.time === h);
                return (
                  <div
                    key={h}
                    className={cn(
                      "rounded-full border px-2 py-1.5 text-center text-xs",
                      busy
                        ? "border-border bg-secondary/70 text-muted-foreground line-through"
                        : "border-gold/40 bg-gold/10 text-foreground",
                    )}
                  >
                    {h}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
