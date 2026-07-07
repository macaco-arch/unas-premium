import { createFileRoute } from "@tanstack/react-router";
import { Clock, Plus, Pencil } from "lucide-react";
import { SERVICES, formatPrice } from "@/lib/salon-data";

export const Route = createFileRoute("/admin/servicios")({
  component: ServicesAdmin,
});

function ServicesAdmin() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="text-xs uppercase tracking-[0.25em] text-gold">Catálogo</div>
          <h1 className="mt-1 font-display text-3xl md:text-4xl">Servicios</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {SERVICES.length} servicios activos en el menú.
          </p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-all hover:-translate-y-0.5 hover:shadow-luxe">
          <Plus className="h-4 w-4" /> Nuevo servicio
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {SERVICES.map((s) => (
          <div
            key={s.id}
            className="group overflow-hidden rounded-2xl border border-border/60 bg-card shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-luxe"
          >
            <div className="relative aspect-[16/9] overflow-hidden">
              <img
                src={s.image}
                alt={s.name}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <button className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full bg-background/90 text-foreground shadow-soft backdrop-blur transition-colors hover:bg-background">
                <Pencil className="h-3.5 w-3.5" />
              </button>
            </div>
            <div className="p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-display text-lg">{s.name}</h3>
                  <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">
                    {s.description}
                  </p>
                </div>
                <div className="text-right">
                  <div className="font-display text-lg">{formatPrice(s.price)}</div>
                  <div className="mt-0.5 flex items-center justify-end gap-1 text-[11px] text-muted-foreground">
                    <Clock className="h-3 w-3" /> {s.duration} min
                  </div>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between border-t border-border/60 pt-3">
                <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.15em] text-emerald-700">
                  Activo
                </span>
                <span className="text-[11px] text-muted-foreground">
                  #{s.id}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
