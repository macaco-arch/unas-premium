import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { SALON_NAME } from "@/lib/salon-data";

const NAV = [
  { label: "Servicios", href: "#servicios" },
  { label: "Galería", href: "#galeria" },
  { label: "Equipo", href: "#equipo" },
  { label: "Opiniones", href: "#opiniones" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const onLanding = pathname === "/";

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        <Link to="/" className="group flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-full border border-gold/50 text-gold font-display text-lg">
            M
          </span>
          <div className="leading-none">
            <div className="font-display text-lg tracking-wide">{SALON_NAME}</div>
            <div className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
              Nail Atelier
            </div>
          </div>
        </Link>

        <nav className="hidden items-center gap-10 md:flex">
          {onLanding &&
            NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm text-foreground/70 transition-colors hover:text-foreground"
              >
                {item.label}
              </a>
            ))}
          <Link
            to="/admin"
            className="text-xs uppercase tracking-[0.25em] text-muted-foreground transition-colors hover:text-gold"
          >
            Admin
          </Link>
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Link
            to="/reservar"
            className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-2.5 text-sm font-medium tracking-wide text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-luxe"
          >
            Reservar cita
          </Link>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="rounded-full border border-border p-2 md:hidden"
          aria-label="Menú"
        >
          {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </div>

      <div
        className={cn(
          "md:hidden overflow-hidden border-t border-border/60 transition-all",
          open ? "max-h-96" : "max-h-0",
        )}
      >
        <div className="flex flex-col gap-1 px-6 py-4">
          {onLanding &&
            NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2 text-sm text-foreground/80 hover:bg-accent"
              >
                {item.label}
              </a>
            ))}
          <Link
            to="/admin"
            onClick={() => setOpen(false)}
            className="rounded-lg px-3 py-2 text-sm text-foreground/80 hover:bg-accent"
          >
            Admin panel
          </Link>
          <Link
            to="/reservar"
            onClick={() => setOpen(false)}
            className="mt-2 rounded-full bg-primary px-4 py-2.5 text-center text-sm font-medium text-primary-foreground"
          >
            Reservar cita
          </Link>
        </div>
      </div>
    </header>
  );
}
