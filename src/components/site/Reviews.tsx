import { Star, Quote } from "lucide-react";
import { REVIEWS } from "@/lib/salon-data";
import { SectionHeader } from "./SectionHeader";

export function Reviews() {
  return (
    <section id="opiniones" className="border-y border-border/50 bg-secondary/30 py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          eyebrow="Testimonios"
          title="Lo que dicen nuestras clientas"
        />
        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {REVIEWS.map((r) => (
            <article
              key={r.id}
              className="relative flex flex-col rounded-3xl border border-border/60 bg-card p-8 shadow-soft transition-shadow hover:shadow-luxe"
            >
              <Quote className="h-8 w-8 text-gold/50" />
              <div className="mt-2 flex items-center gap-1">
                {Array.from({ length: r.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-gold text-gold" />
                ))}
              </div>
              <p className="mt-4 flex-1 text-base leading-relaxed text-foreground/80">
                “{r.text}”
              </p>
              <div className="mt-6 flex items-center gap-3 border-t border-border/60 pt-5">
                <img
                  src={r.avatar}
                  alt={r.name}
                  loading="lazy"
                  className="h-11 w-11 rounded-full object-cover"
                />
                <div>
                  <div className="text-sm font-medium">{r.name}</div>
                  <div className="text-xs text-muted-foreground">{r.handle}</div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
