import type { AppointmentStatus } from "@/lib/salon-data";
import { cn } from "@/lib/utils";

const MAP: Record<AppointmentStatus, { label: string; className: string }> = {
  confirmed: {
    label: "Confirmada",
    className: "border-emerald-200 bg-emerald-50 text-emerald-700",
  },
  pending: {
    label: "Pendiente",
    className: "border-amber-200 bg-amber-50 text-amber-700",
  },
  canceled: {
    label: "Cancelada",
    className: "border-rose-200 bg-rose-50 text-rose-700",
  },
};

export function StatusBadge({ status }: { status: AppointmentStatus }) {
  const cfg = MAP[status];
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.15em]",
        cfg.className,
      )}
    >
      {cfg.label}
    </span>
  );
}
