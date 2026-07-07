import { Star } from "lucide-react";
import { SPECIALISTS } from "@/lib/salon-data";
import { SectionHeader } from "./SectionHeader";

export function Team() {
  return (
    <section id="equipo" className="mx-auto max-w-7xl px-6 py-24 md:py-32">
      <SectionHeader
        eyebrow="Nuestro equipo"
        title="Manos con historia"
        description="Cada una de nuestras especialistas está certificada y dedica tiempo a entender lo que buscas."
      />

      <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {SPECIALISTS.map((p) => (
          <article
            key={p.id}
            className="group relative overflow-hidden rounded-3xl border border-border/60 bg-card transition-all hover:-translate-y-1 hover:shadow-luxe"
          >
            <div className="aspect-[4/5] overflow-hidden">
              <img
                src={p.photo}
                alt={p.name}
                loading="lazy"
                width={600}
                height={750}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="p-5">
              <div className="flex items-center justify-between">
                <h3 className="font-display text-xl">{p.name}</h3>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Star className="h-3.5 w-3.5 fill-gold text-gold" /> {p.rating.toFixed(1)}
                </div>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">{p.specialty}</p>
              <div className="mt-4 flex items-center justify-between border-t border-border/60 pt-3 text-xs">
                <span className="text-muted-foreground">Experiencia</span>
                <span className="font-medium text-foreground">{p.years} años</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
