import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  CalendarDays,
  Users,
  Sparkles,
  BarChart3,
  Settings,
  Search,
  Bell,
  ChevronLeft,
  Gem,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { SALON_NAME } from "@/lib/salon-data";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin — Maison Marín" },
      { name: "description", content: "Panel de administración del salón." },
    ],
  }),
  component: AdminLayout,
});

const NAV = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { to: "/admin/agenda", label: "Agenda", icon: CalendarDays, exact: false },
  { to: "/admin/clientes", label: "Clientes", icon: Users, exact: false },
  { to: "/admin/servicios", label: "Servicios", icon: Sparkles, exact: false },
  { to: "/admin/estadisticas", label: "Estadísticas", icon: BarChart3, exact: false },
  { to: "/admin/configuracion", label: "Configuración", icon: Settings, exact: false },
] as const;

function AdminLayout() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="flex min-h-screen bg-[#faf8f5]">
      {/* ── Sidebar ── */}
      <aside className="sticky top-0 hidden h-screen w-60 flex-shrink-0 flex-col border-r border-[#ede9e3] bg-white md:flex">
        {/* Logo */}
        <div className="flex items-center gap-3 px-5 py-6">
          <div className="grid h-9 w-9 flex-shrink-0 place-items-center rounded-xl bg-gradient-to-br from-[oklch(0.88_0.06_85)] to-[oklch(0.82_0.06_18)] shadow-sm">
            <Gem className="h-4 w-4 text-[oklch(0.55_0.08_60)]" />
          </div>
          <div className="min-w-0 leading-tight">
            <div className="truncate font-display text-[15px] font-semibold tracking-tight text-foreground">
              {SALON_NAME}
            </div>
            <div className="text-[9px] uppercase tracking-[0.28em] text-muted-foreground">
              Studio Admin
            </div>
          </div>
        </div>

        {/* Hairline */}
        <div className="mx-4 h-px bg-[#ede9e3]" />

        {/* Nav */}
        <nav className="flex-1 space-y-0.5 px-3 py-5">
          <p className="mb-2 px-3 text-[9px] font-semibold uppercase tracking-[0.22em] text-muted-foreground/70">
            Menú
          </p>
          {NAV.map((item) => {
            const active = item.exact
              ? pathname === item.to
              : pathname === item.to || pathname.startsWith(item.to + "/");
            const Icon = item.icon;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-[13px] font-medium transition-all duration-150",
                  active
                    ? "bg-[oklch(0.94_0.028_20)/60%] text-foreground"
                    : "text-foreground/55 hover:bg-[#f4f0ec] hover:text-foreground",
                )}
              >
                <Icon
                  className={cn(
                    "h-[15px] w-[15px] flex-shrink-0 transition-colors",
                    active
                      ? "text-[oklch(0.65_0.09_60)]"
                      : "text-muted-foreground/60 group-hover:text-foreground/80",
                  )}
                />
                {item.label}
                {active && (
                  <span className="ml-auto h-1.5 w-1.5 rounded-full bg-[oklch(0.72_0.11_80)]" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Footer link */}
        <div className="mx-4 h-px bg-[#ede9e3]" />
        <div className="px-4 py-4">
          <Link
            to="/"
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-[11px] text-muted-foreground transition-colors hover:bg-[#f4f0ec] hover:text-foreground"
          >
            <ChevronLeft className="h-3.5 w-3.5" />
            Volver al sitio público
          </Link>
        </div>
      </aside>

      {/* ── Main ── */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Header */}
        <header className="sticky top-0 z-30 flex h-[60px] items-center gap-3 border-b border-[#ede9e3] bg-white/90 px-6 backdrop-blur-xl">
          {/* Mobile logo */}
          <div className="flex items-center gap-2 md:hidden">
            <div className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-[oklch(0.88_0.06_85)] to-[oklch(0.82_0.06_18)]">
              <Gem className="h-3.5 w-3.5 text-[oklch(0.55_0.08_60)]" />
            </div>
            <span className="font-display text-sm text-foreground">{SALON_NAME}</span>
          </div>

          {/* Search */}
          <div className="relative ml-auto hidden max-w-xs flex-1 md:block">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground/60" />
            <input
              id="admin-search"
              type="search"
              placeholder="Buscar cliente, cita o servicio…"
              className="w-full rounded-full border border-[#ede9e3] bg-[#faf8f5] pl-9 pr-4 py-[7px] text-[13px] text-foreground outline-none transition-all placeholder:text-muted-foreground/50 focus:border-[oklch(0.72_0.11_80)/60%] focus:bg-white focus:ring-2 focus:ring-[oklch(0.72_0.11_80)/15%]"
            />
          </div>

          {/* Notifications */}
          <button
            id="admin-notifications"
            className="relative flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border border-[#ede9e3] bg-white text-muted-foreground transition-colors hover:border-[oklch(0.72_0.11_80)/40%] hover:text-foreground"
          >
            <Bell className="h-4 w-4" />
            <span className="absolute right-[7px] top-[7px] h-[7px] w-[7px] rounded-full border-2 border-white bg-[oklch(0.72_0.11_80)]" />
          </button>

          {/* Avatar pill */}
          <div className="flex items-center gap-2.5 rounded-full border border-[#ede9e3] bg-white pl-1 pr-3 py-1">
            <div className="grid h-7 w-7 flex-shrink-0 place-items-center rounded-full bg-gradient-to-br from-[oklch(0.82_0.06_18)] to-[oklch(0.78_0.04_55)] text-[11px] font-semibold text-white">
              RM
            </div>
            <div className="hidden text-[12px] md:block">
              <div className="font-semibold leading-tight text-foreground">Regina M.</div>
              <div className="text-[10px] leading-tight text-muted-foreground">Owner</div>
            </div>
          </div>
        </header>

        {/* Mobile nav */}
        <nav className="flex overflow-x-auto border-b border-[#ede9e3] bg-white px-4 md:hidden">
          {NAV.map((item) => {
            const active = item.exact
              ? pathname === item.to
              : pathname === item.to || pathname.startsWith(item.to + "/");
            return (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "flex-shrink-0 border-b-2 px-3 py-3 text-xs font-medium transition-colors",
                  active
                    ? "border-[oklch(0.72_0.11_80)] text-foreground"
                    : "border-transparent text-muted-foreground",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <main className="flex-1 p-6 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
