import { useRef, useState, KeyboardEvent } from "react";
import { ArrowUp, Filter } from "lucide-react";

export default function QueryInput({
  onSend,
  disabled,
  activeDocument,
}: {
  onSend: (q: string) => void;
  disabled?: boolean;
  activeDocument?: string | null;
}) {
  const [value, setValue] = useState("");
  const taRef = useRef<HTMLTextAreaElement>(null);

  function autoSize() {
    const ta = taRef.current;
    if (!ta) return;
    ta.style.height = "auto";
    ta.style.height = Math.min(ta.scrollHeight, 200) + "px";
  }

  function submit() {
    const q = value.trim();
    if (!q || disabled) return;
    onSend(q);
    setValue("");
    if (taRef.current) taRef.current.style.height = "auto";
  }

  function onKey(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      submit();
    }
  }

  return (
    <div className="px-4 pb-5 pt-2">
      <div className="mx-auto max-w-3xl">
        {activeDocument && (
          <div className="mb-2 inline-flex items-center gap-1.5 text-[11px] px-2 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary">
            <Filter className="size-3" />
            Filtering by: {activeDocument}
          </div>
        )}
        <div className="relative rounded-2xl border border-border bg-surface-elevated/80 backdrop-blur-sm shadow-lg shadow-black/20 focus-within:border-primary/40 transition-colors">
          <textarea
            ref={taRef}
            rows={1}
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
              autoSize();
            }}
            onKeyDown={onKey}
            placeholder="Ask anything about your documents…"
            className="w-full resize-none bg-transparent px-4 py-3.5 pr-14 text-sm placeholder:text-muted-foreground/60 focus:outline-none"
          />
          <button
            onClick={submit}
            disabled={disabled || !value.trim()}
            className="absolute right-2 bottom-2 size-9 grid place-items-center rounded-xl bg-primary text-primary-foreground disabled:opacity-30 disabled:cursor-not-allowed enabled:hover:opacity-90 transition-all"
          >
            <ArrowUp className="size-4" />
          </button>
        </div>
        <div className="mt-2 text-center text-[11px] text-muted-foreground/60">
          Press Enter to send · Shift + Enter for newline
        </div>
      </div>
    </div>
  );
}
