import { Link } from "@tanstack/react-router";
import { Sparkles, Star } from "lucide-react";
import heroImg from "@/assets/hero-nails.jpg";
import { WHATSAPP_NUMBER } from "@/lib/salon-data";
import { WhatsAppIcon } from "./WhatsAppIcon";

export function Hero() {
  const waLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    "Hola Maison Marín 👋 Me gustaría agendar una cita.",
  )}`;

  return (
    <section className="relative overflow-hidden bg-gradient-luxe">
      <div className="pointer-events-none absolute -top-40 -right-32 h-[500px] w-[500px] rounded-full bg-gradient-blush opacity-70 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -left-32 h-[500px] w-[500px] rounded-full bg-gradient-blush opacity-40 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl gap-16 px-6 pb-24 pt-16 md:grid-cols-2 md:items-center md:gap-8 md:pb-32 md:pt-24">
        <div className="max-w-xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-background/60 px-3 py-1.5 text-xs uppercase tracking-[0.25em] text-foreground/70 backdrop-blur">
            <Sparkles className="h-3.5 w-3.5 text-gold" />
            Nail Atelier · Polanco
          </div>

          <h1 className="mt-6 font-display text-5xl leading-[1.05] tracking-tight text-foreground md:text-7xl">
            Uñas que{" "}
            <span className="italic text-gradient-gold">reflejan</span>{" "}
            tu estilo.
          </h1>

          <p className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground md:text-lg">
            Un ritual personalizado en manos de nuestras especialistas. Reserva tu
            cita en segundos y déjate consentir.
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/reservar"
              className="group inline-flex items-center justify-center rounded-full bg-primary px-7 py-4 text-sm font-medium tracking-wide text-primary-foreground shadow-luxe transition-all hover:-translate-y-0.5 hover:bg-primary/90"
            >
              Reservar cita
              <span className="ml-2 transition-transform group-hover:translate-x-1">→</span>
            </Link>
            <a
              href={waLink}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-foreground/15 bg-background/60 px-7 py-4 text-sm font-medium tracking-wide text-foreground backdrop-blur transition-all hover:border-foreground/30 hover:bg-background"
            >
              <WhatsAppIcon className="h-4 w-4" />
              Hablar por WhatsApp
            </a>
          </div>

          <div className="mt-12 flex items-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-gold text-gold" />
              ))}
              <span className="ml-2 font-medium text-foreground">4.9</span>
            </div>
            <div className="h-4 w-px bg-border" />
            <div>+2,400 clientas felices</div>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-8 rounded-[3rem] bg-gradient-blush opacity-60 blur-2xl" />
          <div className="relative overflow-hidden rounded-[2.5rem] border border-white/60 shadow-luxe">
            <img
              src={heroImg}
              alt="Manicura elegante en Maison Marín"
              width={1600}
              height={1200}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="absolute -bottom-6 -left-6 hidden max-w-[220px] rounded-2xl border border-border/60 bg-background/90 p-4 shadow-luxe backdrop-blur md:block">
            <div className="text-xs uppercase tracking-[0.2em] text-gold">Hoy</div>
            <div className="mt-1 font-display text-lg">3 espacios disponibles</div>
            <div className="mt-1 text-xs text-muted-foreground">
              Reserva antes de las 18:00
            </div>
          </div>

          <div className="absolute -top-4 -right-4 hidden rounded-2xl border border-border/60 bg-background/90 p-3 shadow-soft backdrop-blur md:block">
            <div className="flex items-center gap-2">
              <div className="grid h-9 w-9 place-items-center rounded-full bg-gold/15 text-gold">
                <Sparkles className="h-4 w-4" />
              </div>
              <div>
                <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  Primera visita
                </div>
                <div className="text-sm font-medium">15% de descuento</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
