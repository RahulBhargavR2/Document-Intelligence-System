import Header from "@/components/layout/Header";
import ChatWindow from "./ChatWindow";
import QueryInput from "./QueryInput";

export default function ChatArea({
  chat,
  loading,
  onSend,
  activeDocument,
  onMenuClick,
}: any) {
  return (
    <main className="flex-1 flex flex-col h-screen min-w-0">
      <Header
        title={chat?.title || "New chat"}
        subtitle="End-to-End RAG · Hybrid retrieval"
        onMenuClick={onMenuClick}
      />
      <ChatWindow messages={chat?.messages || []} loading={loading} />
      <QueryInput onSend={onSend} disabled={loading} activeDocument={activeDocument} />
    </main>
  );
}
