import { useRef, useState } from "react";
import { Upload, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { uploadDocument } from "@/services/api";

export default function UploadBox({ onUploaded }: { onUploaded: () => void }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [drag, setDrag] = useState(false);
  const [progress, setProgress] = useState(0);
  const [state, setState] = useState<"idle" | "uploading" | "done" | "error">("idle");
  const [error, setError] = useState("");

  async function handleFiles(files: FileList | null) {
    if (!files?.length) return;
    const file = files[0];
    if (!file.name.toLowerCase().endsWith(".pdf")) {
      setState("error");
      setError("Only PDF files are supported");
      setTimeout(() => setState("idle"), 2500);
      return;
    }
    setState("uploading");
    setProgress(0);
    setError("");
    try {
      await uploadDocument(file, setProgress);
      setState("done");
      onUploaded();
      setTimeout(() => setState("idle"), 1800);
    } catch (e: any) {
      setState("error");
      setError(e?.message || "Upload failed");
      setTimeout(() => setState("idle"), 2500);
    }
  }

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setDrag(true);
      }}
      onDragLeave={() => setDrag(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDrag(false);
        handleFiles(e.dataTransfer.files);
      }}
      onClick={() => inputRef.current?.click()}
      className={`group cursor-pointer rounded-xl border border-dashed transition-all px-3 py-4 text-center ${
        drag
          ? "border-primary/60 bg-primary/5"
          : "border-border hover:border-primary/40 hover:bg-accent/30"
      }`}
    >
      <input
        ref={inputRef}
        type="file"
        accept="application/pdf,.pdf"
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />
      {state === "idle" && (
        <div className="flex flex-col items-center gap-1.5">
          <Upload className="size-4 text-muted-foreground group-hover:text-primary transition-colors" />
          <div className="text-xs font-medium">Drop PDF or click</div>
          <div className="text-[10px] text-muted-foreground/70">PDF up to 20MB</div>
        </div>
      )}
      {state === "uploading" && (
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="size-4 text-primary animate-spin" />
          <div className="text-xs">Uploading… {progress}%</div>
          <div className="w-full h-1 rounded-full bg-border overflow-hidden">
            <div
              className="h-full bg-primary transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}
      {state === "done" && (
        <div className="flex flex-col items-center gap-1.5 text-emerald-400">
          <CheckCircle2 className="size-4" />
          <div className="text-xs">Indexed</div>
        </div>
      )}
      {state === "error" && (
        <div className="flex flex-col items-center gap-1.5 text-rose-400">
          <AlertCircle className="size-4" />
          <div className="text-xs">{error}</div>
        </div>
      )}
    </div>
  );
}
