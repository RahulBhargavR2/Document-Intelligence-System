import { MessageSquare } from "lucide-react";

export default function ChatHistory({ chats, activeChatId, onSelect }: any) {
  if (!chats?.length) {
    return (
      <div className="px-2 py-3 text-xs text-muted-foreground/70">
        No chats yet. Start a new conversation.
      </div>
    );
  }
  return (
    <div className="space-y-0.5">
      {chats.map((c: any) => {
        const active = c.id === activeChatId;
        return (
          <button
            key={c.id}
            onClick={() => onSelect(c.id)}
            className={`w-full group flex items-center gap-2 px-2.5 py-2 rounded-lg text-sm text-left transition-all ${
              active
                ? "bg-accent text-foreground"
                : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
            }`}
          >
            <MessageSquare className={`size-3.5 shrink-0 ${active ? "text-primary" : ""}`} />
            <span className="truncate">{c.title || "Untitled chat"}</span>
          </button>
        );
      })}
    </div>
  );
}
