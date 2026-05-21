// Lightweight API client for the RAG backend.
// Configure VITE_API_BASE_URL or it defaults to http://localhost:8000
import axios from "axios";

const baseURL =
  (import.meta as any).env?.VITE_API_BASE_URL || "http://localhost:8000";

export const api = axios.create({ baseURL, timeout: 60000 });

export async function uploadDocument(file: File, onProgress?: (p: number) => void) {
  const form = new FormData();
  form.append("file", file);
  const res = await api.post("/upload", form, {
    headers: { "Content-Type": "multipart/form-data" },
    onUploadProgress: (e: any) => {
      if (e.total && onProgress) onProgress(Math.round((e.loaded / e.total) * 100));
    },
  });
  return res.data;
}

export async function fetchDocuments() {
  const res = await api.get("/documents");
  return res.data;
}

export async function queryRag(question: string, source?: string | null) {
  const res = await api.get("/query", {
    params: source ? { question, source } : { question },
  });
  return res.data as { answer: string; sources?: any[]; latency_seconds?: number };
}

export async function fetchStats() {
  const res = await api.get("/metrics");
  return res.data;
}
