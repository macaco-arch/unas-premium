import { Link } from "@tanstack/react-router";
import { Gift, HeartHandshake, ArrowUpRight } from "lucide-react";

export function Promotions() {
  return (
    <section id="promociones" className="mx-auto max-w-7xl px-6 py-24 md:py-32">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="group relative overflow-hidden rounded-[2rem] border border-gold/30 bg-gradient-blush p-10 md:p-12">
          <div className="pointer-events-none absolute -top-16 -right-16 h-64 w-64 rounded-full bg-white/40 blur-3xl" />
          <div className="relative">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/60 px-3 py-1.5 text-[10px] uppercase tracking-[0.25em] text-foreground/70 backdrop-blur">
              <Gift className="h-3.5 w-3.5 text-gold" />
              Solo para ti
            </div>
            <h3 className="mt-6 font-display text-4xl leading-tight md:text-5xl">
              15% OFF en tu <br /> primera visita
            </h3>
            <p className="mt-4 max-w-md text-sm text-foreground/70">
              Descubre por qué somos el atelier favorito de Polanco. Válido en cualquier
              servicio, de lunes a jueves.
            </p>
            <Link
              to="/reservar"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-all hover:-translate-y-0.5 hover:shadow-luxe"
            >
              Reclamar promoción <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <div className="group relative overflow-hidden rounded-[2rem] border border-border bg-primary p-10 text-primary-foreground md:p-12">
          <div className="pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-gold/25 blur-3xl" />
          <div className="relative">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 px-3 py-1.5 text-[10px] uppercase tracking-[0.25em] backdrop-blur">
              <HeartHandshake className="h-3.5 w-3.5 text-gold" />
              Novias
            </div>
            <h3 className="mt-6 font-display text-4xl leading-tight md:text-5xl">
              Paquetes para <br /> novias
            </h3>
            <p className="mt-4 max-w-md text-sm opacity-80">
              Prueba, día del evento y una sesión para tu cortejo. Diseñado para
              recordarse en cada foto.
            </p>
            <Link
              to="/reservar"
              className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/5 px-6 py-3 text-sm font-medium text-primary-foreground transition-all hover:border-gold hover:bg-white/10"
            >
              Agendar consulta <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
