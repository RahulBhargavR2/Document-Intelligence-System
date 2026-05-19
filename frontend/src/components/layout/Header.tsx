import { Menu } from "lucide-react";

export default function Header({
  title,
  subtitle,
  onMenuClick,
}: {
  title: string;
  subtitle?: string;
  onMenuClick?: () => void;
}) {
  return (
    <header className="h-14 shrink-0 px-3 sm:px-5 flex items-center justify-between border-b border-border bg-background/60 backdrop-blur-md">
      <div className="flex items-center gap-2 min-w-0">
        {onMenuClick && (
          <button
            onClick={onMenuClick}
            className="md:hidden size-9 grid place-items-center rounded-lg border border-border bg-surface-elevated/50 hover:bg-accent transition-colors"
            aria-label="Open sidebar"
          >
            <Menu className="size-4" />
          </button>
        )}
        <div className="min-w-0">
          <div className="text-sm font-semibold tracking-tight truncate">{title}</div>
          {subtitle && (
            <div className="text-[11px] text-muted-foreground truncate">{subtitle}</div>
          )}
        </div>
      </div>
      <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
        <span className="hidden sm:inline px-2 py-1 rounded-md border border-border bg-surface-elevated/50">
          FAISS · BM25 · Rerank
        </span>
      </div>
    </header>
  );
}
