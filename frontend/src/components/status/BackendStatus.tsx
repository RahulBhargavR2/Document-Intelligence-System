import { Activity } from "lucide-react";

export default function BackendStatus({ stats, online }: any) {
  return (
    <div className="rounded-xl border border-border bg-surface-elevated/40 p-3">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Activity className="size-3.5 text-muted-foreground" />
          <span className="text-xs font-medium">System</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span
            className={`size-1.5 rounded-full ${
              online ? "bg-emerald-400 shadow-[0_0_8px] shadow-emerald-400/60" : "bg-rose-500"
            }`}
          />
          <span className="text-[11px] text-muted-foreground">
            {online ? "Online" : "Offline"}
          </span>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2 text-[11px]">
        <Stat label="Cache" value={stats?.cache_hits ?? stats?.cache?.hits ?? "–"} />
        <Stat label="Vectors" value={stats?.vectors ?? stats?.index_size ?? "–"} />
        <Stat label="Queries" value={stats?.queries ?? stats?.total_queries ?? "–"} />
        <Stat label="Latency" value={stats?.avg_latency ? `${Number(stats.avg_latency).toFixed(2)}s` : "–"} />
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: any }) {
  return (
    <div className="rounded-lg bg-background/50 border border-border/60 px-2 py-1.5">
      <div className="text-muted-foreground/70">{label}</div>
      <div className="font-mono text-foreground truncate">{String(value)}</div>
    </div>
  );
}
