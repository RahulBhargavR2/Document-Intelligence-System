import { useEffect, useState, useCallback } from "react";
import Sidebar from "@/components/layout/Sidebar";
import ChatArea from "@/components/chat/ChatArea";
import { fetchDocuments, fetchStats, queryRag } from "@/services/api";

type Msg = { role: "user" | "assistant"; content: string; sources?: any[]; latency?: number };
type Chat = { id: number; title: string; messages: Msg[] };

export default function Home() {
  const [chats, setChats] = useState<Chat[]>([
    { id: 1, title: "New chat", messages: [] },
  ]);
  const [activeChatId, setActiveChatId] = useState(1);
  const [loading, setLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [documents, setDocuments] = useState<any[]>([]);
  const [activeDocument, setActiveDocument] = useState<string | null>(null);
  const [stats, setStats] = useState<any>(null);
  const [online, setOnline] = useState(false);

  const refreshDocs = useCallback(async () => {
    try {
      const data = await fetchDocuments();
      const list = Array.isArray(data) ? data : data?.documents || [];
      setDocuments(list);
    } catch {
      setDocuments([]);
    }
  }, []);

  const refreshStats = useCallback(async () => {
    try {
      // const data = await fetchStats();
      const data = {}
      setStats(data);
      setOnline(true);
    } catch {
      setOnline(false);
    }
  }, []);

  useEffect(() => {
    refreshDocs();
    refreshStats();
    const t = setInterval(refreshStats, 15000);
    return () => clearInterval(t);
  }, [refreshDocs, refreshStats]);

  const activeChat = chats.find((c) => c.id === activeChatId);

  function newChat() {
    const id = Date.now();
    setChats((prev) => [{ id, title: "New chat", messages: [] }, ...prev]);
    setActiveChatId(id);
  }

  async function handleSend(question: string) {
    setLoading(true);
    setChats((prev) =>
      prev.map((c) =>
        c.id === activeChatId
          ? {
              ...c,
              title:
                c.messages.length === 0
                  ? question.slice(0, 40) + (question.length > 40 ? "…" : "")
                  : c.title,
              messages: [...c.messages, { role: "user", content: question }],
            }
          : c
      )
    );
    try {
      const res = await queryRag(question, activeDocument);
      setChats((prev) =>
        prev.map((c) =>
          c.id === activeChatId
            ? {
                ...c,
                messages: [
                  ...c.messages,
                  {
                    role: "assistant",
                    content: res.answer || "No answer returned.",
                    sources: res.sources,
                    latency: res.latency_seconds,
                  },
                ],
              }
            : c
        )
      );
    } catch (e: any) {
      setChats((prev) =>
        prev.map((c) =>
          c.id === activeChatId
            ? {
                ...c,
                messages: [
                  ...c.messages,
                  {
                    role: "assistant",
                    content:
                      "⚠️ Could not reach the RAG backend. Make sure the FastAPI server is running and VITE_API_BASE_URL is set.",
                  },
                ],
              }
            : c
        )
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden">
      <Sidebar
        chats={chats}
        activeChatId={activeChatId}
        onNewChat={() => {
          newChat();
          setSidebarOpen(false);
        }}
        onSelectChat={(id: number) => {
          setActiveChatId(id);
          setSidebarOpen(false);
        }}
        documents={documents}
        activeDocument={activeDocument}
        onSelectDocument={setActiveDocument}
        onUploaded={refreshDocs}
        stats={stats}
        online={online}
        open={sidebarOpen}
        onOpenChange={setSidebarOpen}
      />
      <ChatArea
        chat={activeChat}
        loading={loading}
        onSend={handleSend}
        activeDocument={activeDocument}
        onMenuClick={() => setSidebarOpen(true)}
      />
    </div>
  );
}
