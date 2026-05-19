import { FileText, Check } from "lucide-react";

export default function DocumentList({ documents, active, onSelect }: any) {
  if (!documents?.length) {
    return (
      <div className="px-2 py-3 text-xs text-muted-foreground/70">
        No documents uploaded yet.
      </div>
    );
  }
  return (
    <div className="space-y-0.5">
      <button
        onClick={() => onSelect(null)}
        className={`w-full flex items-center gap-2 px-2.5 py-2 rounded-lg text-xs transition-all ${
          !active
            ? "bg-primary/10 text-primary border border-primary/20"
            : "text-muted-foreground hover:bg-accent/50 border border-transparent"
        }`}
      >
        <span className="size-1.5 rounded-full bg-current" />
        All documents
      </button>
      {documents.map((d: any) => {
        const name = typeof d === "string" ? d : d.name || d.filename || d.source;
        const isActive = active === name;
        return (
          <button
            key={name}
            onClick={() => onSelect(name)}
            className={`w-full group flex items-center gap-2 px-2.5 py-2 rounded-lg text-xs text-left transition-all border ${
              isActive
                ? "bg-primary/10 text-primary border-primary/20"
                : "text-muted-foreground hover:bg-accent/50 hover:text-foreground border-transparent"
            }`}
          >
            <FileText className="size-3.5 shrink-0" />
            <span className="truncate flex-1">{name}</span>
            {isActive && <Check className="size-3.5" />}
          </button>
        );
      })}
    </div>
  );
}
