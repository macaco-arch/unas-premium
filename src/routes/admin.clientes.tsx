import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Search, Plus } from "lucide-react";
import { CLIENTS, formatPrice } from "@/lib/salon-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/admin/clientes")({
  component: ClientsPage,
});

const TIER_STYLES: Record<(typeof CLIENTS)[number]["tier"], string> = {
  VIP: "border-gold/40 bg-gold/10 text-yellow-800",
  Frecuente: "border-blush-deep/40 bg-blush/40 text-rose-900",
  Nueva: "border-border bg-secondary text-muted-foreground",
};

function ClientsPage() {
  const [q, setQ] = useState("");
  const rows = CLIENTS.filter((c) =>
    c.name.toLowerCase().includes(q.toLowerCase()),
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="text-xs uppercase tracking-[0.25em] text-gold">Clientes</div>
          <h1 className="mt-1 font-display text-3xl md:text-4xl">Directorio</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {CLIENTS.length} clientas activas en total.
          </p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-all hover:-translate-y-0.5 hover:shadow-luxe">
          <Plus className="h-4 w-4" /> Nueva clienta
        </button>
      </div>

      <div className="rounded-2xl border border-border/60 bg-card p-4 shadow-soft">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Buscar por nombre..."
            className="w-full rounded-full border border-border bg-secondary/60 pl-9 pr-4 py-2.5 text-sm outline-none transition-colors focus:border-primary focus:bg-background"
          />
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-border/60 bg-card shadow-soft">
        <div className="grid grid-cols-[1.5fr_1fr_100px_1fr_120px_100px] gap-4 border-b border-border/60 bg-secondary/60 px-6 py-3 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          <div>Clienta</div>
          <div>WhatsApp</div>
          <div className="text-right">Visitas</div>
          <div>Última visita</div>
          <div className="text-right">Gasto total</div>
          <div className="text-right">Tier</div>
        </div>
        {rows.map((c) => (
          <div
            key={c.id}
            className="grid grid-cols-[1.5fr_1fr_100px_1fr_120px_100px] items-center gap-4 border-b border-border/60 px-6 py-4 text-sm last:border-b-0 hover:bg-secondary/40"
          >
            <div className="flex items-center gap-3">
              <div className="grid h-9 w-9 place-items-center rounded-full bg-primary text-xs text-primary-foreground">
                {c.name.split(" ").map((p) => p[0]).slice(0, 2).join("")}
              </div>
              <div className="font-medium">{c.name}</div>
            </div>
            <div className="text-muted-foreground">{c.phone}</div>
            <div className="text-right font-medium">{c.visits}</div>
            <div className="text-muted-foreground">{c.lastVisit}</div>
            <div className="text-right font-medium">{formatPrice(c.spent)}</div>
            <div className="flex justify-end">
              <span
                className={cn(
                  "inline-flex items-center rounded-full border px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.15em]",
                  TIER_STYLES[c.tier],
                )}
              >
                {c.tier}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
