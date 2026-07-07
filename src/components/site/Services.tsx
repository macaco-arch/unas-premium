import { Link } from "@tanstack/react-router";
import { Clock, ArrowUpRight } from "lucide-react";
import { SERVICES, formatPrice } from "@/lib/salon-data";
import { SectionHeader } from "./SectionHeader";

export function Services() {
  return (
    <section id="servicios" className="relative mx-auto max-w-7xl px-6 py-24 md:py-32">
      <SectionHeader
        eyebrow="Servicios"
        title="Cada detalle, cuidado a mano"
        description="Cuatro décadas de técnica combinadas con las últimas tendencias en cuidado y arte."
      />

      <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {SERVICES.map((s) => (
          <article
            key={s.id}
            className="group relative flex flex-col overflow-hidden rounded-3xl border border-border/60 bg-card transition-all duration-500 hover:-translate-y-1 hover:shadow-luxe"
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              <img
                src={s.image}
                alt={s.name}
                loading="lazy"
                width={800}
                height={600}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {s.tag && (
                <div className="absolute left-4 top-4 rounded-full border border-white/60 bg-background/85 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-foreground backdrop-blur">
                  {s.tag}
                </div>
              )}
              <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/40 to-transparent" />
            </div>

            <div className="flex flex-1 flex-col p-6">
              <div className="flex items-start justify-between gap-4">
                <h3 className="font-display text-2xl">{s.name}</h3>
                <div className="text-right">
                  <div className="font-display text-xl text-foreground">{formatPrice(s.price)}</div>
                </div>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {s.description}
              </p>

              <div className="mt-auto flex items-center justify-between border-t border-border/60 pt-5">
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Clock className="h-3.5 w-3.5" />
                  {s.duration} min
                </div>
                <Link
                  to="/reservar"
                  search={{ service: s.id } as never}
                  className="inline-flex items-center gap-1 text-xs font-medium uppercase tracking-[0.2em] text-foreground transition-colors hover:text-gold"
                >
                  Reservar <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
