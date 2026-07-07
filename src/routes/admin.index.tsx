import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  AreaChart,
  Area,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import {
  TrendingUp,
  Users,
  CalendarCheck,
  Ticket,
  ArrowUpRight,
  ArrowRight,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { APPOINTMENTS, WEEKLY_STATS, formatPrice } from "@/lib/salon-data";
import { format, parseISO } from "date-fns";
import { es } from "date-fns/locale";

export const Route = createFileRoute("/admin/")({
  component: Dashboard,
});

/** Renders children only after first client-side mount.
 *  Prevents Recharts / ResponsiveContainer from measuring a zero-size SSR container. */
function ClientOnly({ children, fallback = null }: { children: React.ReactNode; fallback?: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  return mounted ? <>{children}</> : <>{fallback}</>;
}

/* ── KPI cards ── */
const KPI_CARDS = [
  {
    id: "revenue",
    label: "Ingresos del Mes",
    value: "$45,200",
    delta: "+12%",
    sub: "vs mes pasado",
    icon: TrendingUp,
    accent: "from-[oklch(0.88_0.06_85)] to-[oklch(0.82_0.06_18)]",
    iconColor: "text-[oklch(0.60_0.09_60)]",
  },
  {
    id: "weekly-appts",
    label: "Citas Semanales",
    value: "84",
    delta: "+7%",
    sub: "vs semana pasada",
    icon: CalendarCheck,
    accent: "from-[oklch(0.93_0.025_15)] to-[oklch(0.88_0.045_18)]",
    iconColor: "text-[oklch(0.60_0.07_20)]",
  },
  {
    id: "new-clients",
    label: "Nuevos Clientes",
    value: "12",
    delta: "+3",
    sub: "este mes",
    icon: Users,
    accent: "from-[oklch(0.93_0.018_60)] to-[oklch(0.88_0.035_55)]",
    iconColor: "text-[oklch(0.55_0.06_50)]",
  },
  {
    id: "avg-ticket",
    label: "Ticket Promedio",
    value: "$650",
    delta: "+5%",
    sub: "vs mes pasado",
    icon: Ticket,
    accent: "from-[oklch(0.90_0.06_85)] to-[oklch(0.85_0.08_80)]",
    iconColor: "text-[oklch(0.58_0.10_70)]",
  },
];

/* ── Status badge map ── */
type Status = "confirmed" | "pending" | "canceled";
const STATUS_MAP: Record<Status, { label: string; cls: string }> = {
  confirmed: {
    label: "Confirmada",
    cls: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  pending: {
    label: "Pendiente",
    cls: "bg-amber-50 text-amber-600 border-amber-200",
  },
  canceled: {
    label: "Completada",
    cls: "bg-slate-100 text-slate-500 border-slate-200",
  },
};

/* ── Tooltip personalizado ── */
function ChartTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: { value: number }[];
  label?: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl border border-[#ede9e3] bg-white px-4 py-3 shadow-md">
      <p className="mb-1 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
        {label}
      </p>
      <p className="font-display text-lg text-foreground">
        {formatPrice(payload[0].value)}
      </p>
    </div>
  );
}

/* ── Dashboard ── */
function Dashboard() {
  /* Últimas 6 citas para la tabla */
  const recentAppointments = [...APPOINTMENTS]
    .sort((a, b) => (a.date + a.time < b.date + b.time ? 1 : -1))
    .slice(0, 6);

  return (
    <div className="space-y-8">
      {/* ── Page header ── */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[oklch(0.72_0.11_80)]">
            Dashboard
          </p>
          <h1 className="mt-1 font-display text-3xl font-semibold leading-tight tracking-tight text-foreground md:text-4xl">
            Buenos días, Regina
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Esto es lo que sucede hoy en el salón.
          </p>
        </div>
        <button
          id="dashboard-nueva-cita"
          className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-[13px] font-medium text-[oklch(0.99_0.005_80)] shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
        >
          Nueva cita <ArrowUpRight className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* ── Fila 1: KPIs ── */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {KPI_CARDS.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <Card
              key={kpi.id}
              className="relative overflow-hidden border-[#ede9e3] bg-white shadow-sm transition-shadow hover:shadow-md"
            >
              {/* Subtle gradient strip at top */}
              <div className={`absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r ${kpi.accent}`} />
              <CardContent className="pt-5 pb-4 px-5">
                <div className="flex items-start justify-between">
                  <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
                    {kpi.label}
                  </p>
                  <div
                    className={`grid h-8 w-8 flex-shrink-0 place-items-center rounded-xl bg-gradient-to-br ${kpi.accent}`}
                  >
                    <Icon className={`h-3.5 w-3.5 ${kpi.iconColor}`} />
                  </div>
                </div>
                <p className="mt-3 font-display text-[2rem] font-semibold leading-none tracking-tight text-foreground">
                  {kpi.value}
                </p>
                <div className="mt-2 flex items-center gap-1.5">
                  <span className="inline-flex items-center gap-0.5 rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold text-emerald-600">
                    <TrendingUp className="h-2.5 w-2.5" />
                    {kpi.delta}
                  </span>
                  <span className="text-[11px] text-muted-foreground">{kpi.sub}</span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* ── Fila 2: AreaChart ── */}
      <Card className="border-[#ede9e3] bg-white shadow-sm">
        <CardHeader className="pb-2 pt-6 px-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <CardTitle className="font-display text-xl font-semibold text-foreground">
                Ingresos — Últimos 7 días
              </CardTitle>
              <CardDescription className="mt-0.5 text-[12px]">
                {WEEKLY_STATS.reduce((s, d) => s + d.citas, 0)} citas ·{" "}
                {formatPrice(WEEKLY_STATS.reduce((s, d) => s + d.ingresos, 0))} en total
              </CardDescription>
            </div>
            <span className="mt-0.5 rounded-full border border-[#ede9e3] bg-[#faf8f5] px-3 py-1 text-[11px] text-muted-foreground">
              Esta semana
            </span>
          </div>
        </CardHeader>
        <CardContent className="px-2 pb-4">
          <div className="h-64">
            <ClientOnly
              fallback={
                <div className="flex h-full items-center justify-center">
                  <div className="h-full w-full animate-pulse rounded-xl bg-[#f4f0ec]" />
                </div>
              }
            >
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={WEEKLY_STATS} margin={{ top: 8, right: 16, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="nudeGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#d4a8a0" stopOpacity={0.4} />
                      <stop offset="60%" stopColor="#e8c9a0" stopOpacity={0.15} />
                      <stop offset="100%" stopColor="#f0e4d0" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#ede9e3"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="day"
                    stroke="#b8b0a8"
                    fontSize={11}
                    tickLine={false}
                    axisLine={false}
                    dy={6}
                  />
                  <YAxis
                    stroke="#b8b0a8"
                    fontSize={11}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(v) => `$${v / 1000}k`}
                    width={40}
                  />
                  <Tooltip content={<ChartTooltip />} cursor={{ stroke: "#ede9e3", strokeWidth: 1 }} />
                  <Area
                    type="monotone"
                    dataKey="ingresos"
                    stroke="#c9956a"
                    strokeWidth={2.5}
                    fill="url(#nudeGradient)"
                    dot={{ r: 4, fill: "#c9956a", stroke: "white", strokeWidth: 2 }}
                    activeDot={{ r: 6, fill: "#c9956a", stroke: "white", strokeWidth: 2 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </ClientOnly>
          </div>
        </CardContent>
      </Card>

      {/* ── Fila 3: Tabla de citas recientes ── */}
      <Card className="border-[#ede9e3] bg-white shadow-sm">
        <CardHeader className="pb-3 pt-6 px-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <CardTitle className="font-display text-xl font-semibold text-foreground">
                Citas Recientes
              </CardTitle>
              <CardDescription className="mt-0.5 text-[12px]">
                Las últimas reservas registradas en el estudio
              </CardDescription>
            </div>
            <button className="inline-flex items-center gap-1.5 text-[12px] font-medium text-muted-foreground transition-colors hover:text-foreground">
              Ver todas <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </CardHeader>
        <CardContent className="px-0 pb-2">
          <Table>
            <TableHeader>
              <TableRow className="border-[#ede9e3] hover:bg-transparent">
                <TableHead className="pl-6 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                  Cliente
                </TableHead>
                <TableHead className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                  Servicio
                </TableHead>
                <TableHead className="hidden text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground sm:table-cell">
                  Fecha y Hora
                </TableHead>
                <TableHead className="hidden text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground md:table-cell">
                  Especialista
                </TableHead>
                <TableHead className="text-right pr-6 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                  Estado
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentAppointments.map((appt) => {
                const statusCfg = STATUS_MAP[appt.status as Status];
                const formattedDate = (() => {
                  try {
                    return format(parseISO(appt.date), "d MMM", { locale: es });
                  } catch {
                    return appt.date;
                  }
                })();
                return (
                  <TableRow
                    key={appt.id}
                    className="border-[#ede9e3] transition-colors hover:bg-[#faf8f5]"
                  >
                    {/* Cliente */}
                    <TableCell className="pl-6 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="grid h-8 w-8 flex-shrink-0 place-items-center rounded-full bg-gradient-to-br from-[oklch(0.93_0.025_15)] to-[oklch(0.88_0.045_18)] text-[11px] font-semibold text-[oklch(0.55_0.07_20)]">
                          {appt.clientName
                            .split(" ")
                            .slice(0, 2)
                            .map((n) => n[0])
                            .join("")}
                        </div>
                        <span className="text-[13px] font-medium text-foreground">
                          {appt.clientName}
                        </span>
                      </div>
                    </TableCell>

                    {/* Servicio + precio */}
                    <TableCell className="py-3.5">
                      <p className="text-[13px] text-foreground">{appt.serviceName}</p>
                      <p className="text-[11px] text-muted-foreground">{formatPrice(appt.price)}</p>
                    </TableCell>

                    {/* Fecha y hora */}
                    <TableCell className="hidden py-3.5 sm:table-cell">
                      <p className="text-[13px] text-foreground capitalize">{formattedDate}</p>
                      <p className="text-[11px] text-muted-foreground">{appt.time}</p>
                    </TableCell>

                    {/* Especialista */}
                    <TableCell className="hidden py-3.5 text-[13px] text-muted-foreground md:table-cell">
                      {appt.specialistName}
                    </TableCell>

                    {/* Estado */}
                    <TableCell className="py-3.5 pr-6 text-right">
                      <span
                        className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] ${statusCfg.cls}`}
                      >
                        {statusCfg.label}
                      </span>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
