import { Plus, MessageSquare, FileText, Sparkles } from "lucide-react";
import ChatHistory from "@/components/chat/ChatHistory";
import DocumentList from "@/components/documents/DocumentList";
import BackendStatus from "@/components/status/BackendStatus";
import UploadBox from "@/components/upload/UploadBox";

export default function Sidebar({
  chats,
  activeChatId,
  onNewChat,
  onSelectChat,
  documents,
  activeDocument,
  onSelectDocument,
  onUploaded,
  stats,
  online,
  open,
  onOpenChange,
}: any) {
  return (
    <>
      {/* Mobile backdrop */}
      {open && (
        <div
          onClick={() => onOpenChange?.(false)}
          className="fixed inset-0 z-30 bg-black/60 backdrop-blur-sm md:hidden"
        />
      )}
      <aside
        className={`fixed md:static z-40 w-72 lg:w-80 shrink-0 flex flex-col h-screen bg-sidebar-bg border-r border-border transition-transform duration-200 ${
          open ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
      {/* Brand */}
      <div className="px-5 pt-5 pb-4 flex items-center gap-2.5">
        <div className="size-8 rounded-xl bg-primary/15 border border-primary/30 grid place-items-center">
          <Sparkles className="size-4 text-primary" />
        </div>
        <div className="leading-tight">
          <div className="text-sm font-semibold tracking-tight">Lumen RAG</div>
          <div className="text-[11px] text-muted-foreground">Document intelligence</div>
        </div>
      </div>

      {/* New chat */}
      <div className="px-3">
        <button
          onClick={onNewChat}
          className="w-full flex items-center gap-2 px-3 py-2.5 rounded-xl border border-border bg-surface-elevated/60 hover:bg-accent transition-all text-sm font-medium"
        >
          <Plus className="size-4" />
          New chat
        </button>
      </div>

      {/* Scrollable middle */}
      <div className="flex-1 overflow-y-auto mt-4 px-3 space-y-6 pb-4">
        <Section icon={<MessageSquare className="size-3.5" />} label="Chats">
          <ChatHistory chats={chats} activeChatId={activeChatId} onSelect={onSelectChat} />
        </Section>

        <Section icon={<FileText className="size-3.5" />} label="Documents">
          <UploadBox onUploaded={onUploaded} />
          <DocumentList
            documents={documents}
            active={activeDocument}
            onSelect={onSelectDocument}
          />
        </Section>
      </div>

      {/* Status footer */}
      <div className="border-t border-border p-3">
        <BackendStatus stats={stats} online={online} />
      </div>
      </aside>
    </>
  );
}

function Section({ icon, label, children }: any) {
  return (
    <div>
      <div className="px-2 mb-2 flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
        {icon}
        {label}
      </div>
      <div className="space-y-2">{children}</div>
    </div>
  );
}
