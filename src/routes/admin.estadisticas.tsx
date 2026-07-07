import { createFileRoute } from "@tanstack/react-router";
import {
  BarChart,
  Bar,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { TrendingUp, DollarSign, Users, Percent } from "lucide-react";
import { WEEKLY_STATS, TOP_SERVICES, formatPrice } from "@/lib/salon-data";

export const Route = createFileRoute("/admin/estadisticas")({
  component: StatsPage,
});

const COLORS = ["var(--gold)", "var(--blush-deep)", "var(--nude-deep)", "var(--primary)", "var(--muted-foreground)"];

function StatsPage() {
  const totalRevenue = WEEKLY_STATS.reduce((s, d) => s + d.ingresos, 0);
  const totalAppts = WEEKLY_STATS.reduce((s, d) => s + d.citas, 0);
  const avgTicket = totalRevenue / totalAppts;

  const kpis = [
    { label: "Ingresos totales", value: formatPrice(totalRevenue), delta: "+18.4%", icon: DollarSign },
    { label: "Citas realizadas", value: totalAppts.toString(), delta: "+12%", icon: Users },
    { label: "Ticket promedio", value: formatPrice(Math.round(avgTicket)), delta: "+4.6%", icon: TrendingUp },
    { label: "Retención", value: "82%", delta: "+3.1%", icon: Percent },
  ];

  return (
    <div className="space-y-8">
      <div>
        <div className="text-xs uppercase tracking-[0.25em] text-gold">Estadísticas</div>
        <h1 className="mt-1 font-display text-3xl md:text-4xl">Rendimiento del salón</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Última semana · datos de demostración.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {kpis.map((k) => {
          const Icon = k.icon;
          return (
            <div key={k.label} className="rounded-2xl border border-border/60 bg-card p-5 shadow-soft">
              <div className="flex items-start justify-between">
                <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  {k.label}
                </div>
                <div className="grid h-9 w-9 place-items-center rounded-full bg-gold/15 text-gold">
                  <Icon className="h-4 w-4" />
                </div>
              </div>
              <div className="mt-4 font-display text-3xl">{k.value}</div>
              <div className="mt-1 text-xs font-medium text-emerald-600">{k.delta}</div>
            </div>
          );
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-2xl border border-border/60 bg-card p-6 shadow-soft lg:col-span-2">
          <h2 className="font-display text-xl">Citas por día</h2>
          <p className="text-xs text-muted-foreground">Volumen semanal</p>
          <div className="mt-6 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={WEEKLY_STATS}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis dataKey="day" stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{
                    background: "var(--card)",
                    border: "1px solid var(--border)",
                    borderRadius: 12,
                    fontSize: 12,
                  }}
                />
                <Bar dataKey="citas" fill="var(--gold)" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-2xl border border-border/60 bg-card p-6 shadow-soft">
          <h2 className="font-display text-xl">Mix de servicios</h2>
          <p className="text-xs text-muted-foreground">Distribución</p>
          <div className="mt-6 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={TOP_SERVICES}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={55}
                  outerRadius={90}
                  paddingAngle={3}
                >
                  {TOP_SERVICES.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Legend
                  iconType="circle"
                  wrapperStyle={{ fontSize: 11 }}
                />
                <Tooltip
                  contentStyle={{
                    background: "var(--card)",
                    border: "1px solid var(--border)",
                    borderRadius: 12,
                    fontSize: 12,
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
