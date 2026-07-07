import { useState } from "react";
import { GALLERY, GALLERY_CATEGORIES } from "@/lib/salon-data";
import { cn } from "@/lib/utils";
import { SectionHeader } from "./SectionHeader";

export function Gallery() {
  const [active, setActive] = useState<(typeof GALLERY_CATEGORIES)[number]>("Todos");

  const items = active === "Todos" ? GALLERY : GALLERY.filter((g) => g.category === active);

  return (
    <section id="galeria" className="border-y border-border/50 bg-secondary/40 py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          eyebrow="Galería"
          title="Diseños destacados"
          description="Una selección de nuestras piezas más queridas por la comunidad Maison."
        />

        <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
          {GALLERY_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={cn(
                "rounded-full border px-4 py-2 text-xs uppercase tracking-[0.2em] transition-all",
                active === cat
                  ? "border-primary bg-primary text-primary-foreground shadow-soft"
                  : "border-border bg-background text-muted-foreground hover:border-foreground/40 hover:text-foreground",
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="mt-12 grid auto-rows-[260px] grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {items.map((item, i) => (
            <figure
              key={item.id}
              className={cn(
                "group relative overflow-hidden rounded-3xl border border-border/60 bg-card shadow-soft",
                i % 5 === 0 && "md:col-span-2 md:row-span-2",
                i % 7 === 3 && "md:row-span-2",
              )}
            >
              <img
                src={item.image}
                alt={item.category}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <figcaption className="absolute inset-x-0 bottom-0 translate-y-4 p-5 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                <div className="text-[10px] uppercase tracking-[0.3em] text-gold-soft">
                  Estilo
                </div>
                <div className="mt-1 font-display text-xl text-white">{item.category}</div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
