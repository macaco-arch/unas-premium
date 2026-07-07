import { Instagram, MapPin, Phone, Clock } from "lucide-react";
import { SALON_NAME } from "@/lib/salon-data";

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 bg-primary text-primary-foreground">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-full border border-gold/60 font-display text-lg text-gold">
              M
            </span>
            <div>
              <div className="font-display text-lg">{SALON_NAME}</div>
              <div className="text-[10px] uppercase tracking-[0.25em] opacity-60">
                Nail Atelier
              </div>
            </div>
          </div>
          <p className="mt-5 max-w-xs text-sm opacity-70">
            Un salón dedicado al detalle. Cada visita es una experiencia diseñada
            para ti.
          </p>
        </div>

        <div>
          <div className="text-xs uppercase tracking-[0.25em] text-gold">Visítanos</div>
          <div className="mt-4 space-y-3 text-sm opacity-80">
            <div className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-gold" />
              Av. Presidente Masaryk 305, Polanco
            </div>
            <div className="flex items-start gap-2">
              <Phone className="mt-0.5 h-4 w-4 flex-shrink-0 text-gold" />
              +52 55 1234 5678
            </div>
            <div className="flex items-start gap-2">
              <Clock className="mt-0.5 h-4 w-4 flex-shrink-0 text-gold" />
              Lun – Sáb · 09:00 – 20:00
            </div>
          </div>
        </div>

        <div>
          <div className="text-xs uppercase tracking-[0.25em] text-gold">Explora</div>
          <ul className="mt-4 space-y-2 text-sm opacity-80">
            <li><a href="#servicios" className="hover:text-gold">Servicios</a></li>
            <li><a href="#galeria" className="hover:text-gold">Galería</a></li>
            <li><a href="#equipo" className="hover:text-gold">Equipo</a></li>
            <li><a href="#promociones" className="hover:text-gold">Promociones</a></li>
          </ul>
        </div>

        <div>
          <div className="text-xs uppercase tracking-[0.25em] text-gold">Síguenos</div>
          <a
            href="#"
            className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm transition-colors hover:border-gold hover:text-gold"
          >
            <Instagram className="h-4 w-4" /> @maisonmarin
          </a>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-6 py-6 text-xs opacity-60 md:flex-row">
          <div>© {new Date().getFullYear()} {SALON_NAME}. Todos los derechos reservados.</div>
          <div>Diseñado con detalle en Ciudad de México.</div>
        </div>
      </div>
    </footer>
  );
}
