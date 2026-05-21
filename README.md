## 🗂️ Project Folder Structure

```bash
document-intelligence-system/
│
├── frontend/                         # React frontend application
│
├── backend/
│   ├── app/
│   │   ├── api/                     # API route handlers
│   │   │   ├── documents.py
│   │   │   ├── query.py
│   │   │   └── upload.py
│   │   │
│   │   ├── core/                    # Application configuration
│   │   │   └── config.py
│   │   │
│   │   ├── services/                # Core business logic & ML services
│   │   │   ├── bm25_service.py
│   │   │   ├── cache_service.py
│   │   │   ├── chunk_service.py
│   │   │   ├── document_service.py
│   │   │   ├── embedding_service.py
│   │   │   ├── llm_service.py
│   │   │   ├── logging_service.py
│   │   │   ├── pdf_service.py
│   │   │   ├── reranker_service.py
│   │   │   ├── retrival_service.py
│   │   │   ├── rewrite_query_service.py
│   │   │   └── vector_store.py
│   │   │
│   │   └── utils/                   # Utility/helper functions
│   │
│   ├── scripts/
│   │   └── download_nltk.py
│   │
│   ├── storage/                     # Persistent vector & document storage
│   │   ├── chunks.json
│   │   ├── documents.json
│   │   └── faiss_index.bin
│   │
│   ├── uploads/                     # Uploaded PDF documents
│   │
│   ├── main.py                      # FastAPI application entry point
│   ├── requirements.txt
│   ├── Dockerfile
│   └── query_logs.jsonl
│
├── docker-compose.yml
├── README.md
│
└── .gitignore
```