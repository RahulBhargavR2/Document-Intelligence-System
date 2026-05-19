import { useEffect, useRef } from "react";
import { Sparkles } from "lucide-react";
import MessageBubble from "./MessageBubble";

export default function ChatWindow({ messages, loading }: { messages: any[]; loading: boolean }) {
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  if (!messages.length && !loading) {
    return (
      <div className="flex-1 grid place-items-center px-6">
        <div className="text-center max-w-md">
          <div className="mx-auto size-12 rounded-2xl bg-primary/15 border border-primary/25 grid place-items-center mb-4">
            <Sparkles className="size-5 text-primary" />
          </div>
          <h2 className="text-lg font-semibold tracking-tight">Ask your documents anything</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Upload a PDF and start querying. Hybrid retrieval with BM25, FAISS, and reranking
            grounds every answer in your sources.
          </p>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-2 text-left">
            {[
              "Summarize the key findings",
              "What does the paper say about X?",
              "Compare section 3 and 4",
              "List all defined terms",
            ].map((s) => (
              <div
                key={s}
                className="rounded-xl border border-border bg-surface-elevated/40 px-3 py-2.5 text-xs text-muted-foreground hover:bg-accent/40 hover:text-foreground transition-all cursor-default"
              >
                {s}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="mx-auto max-w-3xl px-4 py-6 space-y-5">
        {messages.map((m, i) => (
          <MessageBubble key={i} msg={m} />
        ))}
        {loading && <TypingIndicator />}
        <div ref={endRef} />
      </div>
    </div>
  );
}

function TypingIndicator() {
  return (
    <div className="msg-enter flex gap-3">
      <div className="size-8 rounded-lg bg-primary/15 border border-primary/25 grid place-items-center mt-0.5">
        <Sparkles className="size-4 text-primary" />
      </div>
      <div className="px-4 py-3.5 rounded-2xl rounded-bl-md bg-surface-elevated border border-border flex items-center gap-1.5">
        <span className="typing-dot size-1.5 rounded-full bg-muted-foreground" />
        <span className="typing-dot size-1.5 rounded-full bg-muted-foreground" />
        <span className="typing-dot size-1.5 rounded-full bg-muted-foreground" />
      </div>
    </div>
  );
}
