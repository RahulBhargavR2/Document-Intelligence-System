import { User, Sparkles, ChevronDown, FileText, Clock } from "lucide-react";
import { useState } from "react";

export default function MessageBubble({ msg }: { msg: any }) {
  const isUser = msg.role === "user";
  return (
    <div className={`msg-enter flex gap-3 ${isUser ? "justify-end" : "justify-start"}`}>
      {!isUser && (
        <div className="size-8 shrink-0 rounded-lg bg-primary/15 border border-primary/25 grid place-items-center mt-0.5">
          <Sparkles className="size-4 text-primary" />
        </div>
      )}
      <div className={`max-w-[78%] flex flex-col ${isUser ? "items-end" : "items-start"}`}>
        <div
          className={`px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
            isUser
              ? "bg-user-bubble text-user-bubble-fg rounded-br-md"
              : "bg-surface-elevated border border-border text-foreground rounded-bl-md"
          }`}
        >
          {msg.content}
        </div>
        {!isUser && (msg.sources?.length || msg.latency != null) && (
          <Sources sources={msg.sources} latency={msg.latency} />
        )}
      </div>
      {isUser && (
        <div className="size-8 shrink-0 rounded-lg bg-accent border border-border grid place-items-center mt-0.5">
          <User className="size-4 text-muted-foreground" />
        </div>
      )}
    </div>
  );
}

function Sources({ sources, latency }: any) {
  const [open, setOpen] = useState(false);
  return (
    <div className="mt-2 w-full">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 text-[11px] text-muted-foreground hover:text-foreground transition-colors"
      >
        <ChevronDown className={`size-3 transition-transform ${open ? "rotate-0" : "-rotate-90"}`} />
        {sources?.length || 0} sources
        {latency != null && (
          <span className="ml-1 inline-flex items-center gap-1">
            <Clock className="size-3" />
            {Number(latency).toFixed(2)}s
          </span>
        )}
      </button>
      {open && sources?.length > 0 && (
        <div className="mt-2 space-y-1.5">
          {sources.map((s: any, i: number) => {
            const text = typeof s === "string" ? s : s.text || s.chunk || s.content || "";
            const src = typeof s === "string" ? null : s.source || s.document || s.metadata?.source;
            return (
              <div
                key={i}
                className="rounded-lg border border-border bg-background/50 px-3 py-2 text-xs"
              >
                {src && (
                  <div className="flex items-center gap-1.5 mb-1 text-primary/90">
                    <FileText className="size-3" />
                    <span className="truncate">{src}</span>
                  </div>
                )}
                <div className="text-muted-foreground line-clamp-3">{text}</div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
