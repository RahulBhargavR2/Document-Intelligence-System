import { createFileRoute } from "@tanstack/react-router";
import Home from "@/pages/Home";

export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({
    meta: [
      { title: "Lumen RAG · Document Intelligence Workspace" },
      {
        name: "description",
        content:
          "Modern RAG workspace: upload PDFs, run hybrid retrieval, and chat with your documents.",
      },
    ],
  }),
});
