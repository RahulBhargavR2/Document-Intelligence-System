## 🗂️ 1. Project Folder Structure
```
document-intelligence-system/
│
├── frontend/                  # React app
│
├── backend/
│   ├── app/
│   │   ├── api/               # FastAPI routes
│   │   │   ├── upload.py
│   │   │   ├── query.py
│   │   │
│   │   ├── core/              # configs, settings
│   │   ├── services/          # business logic
│   │   │   ├── ingestion.py
│   │   │   ├── retrieval.py
│   │   │   ├── llm.py
│   │   │
│   │   ├── models/            # DB models
│   │   ├── schemas/           # request/response schemas
│   │   ├── utils/             # helpers
│   │
│   ├── main.py
│   ├── requirements.txt
│
├── ml/
│   ├── chunking/
│   ├── embeddings/
│   ├── evaluation/
│   ├── experiments/
│
├── data/
│   ├── raw/
│   ├── processed/
│
├── scripts/
│   ├── ingest.py
│   ├── train_eval.py
│
├── docker/
│   ├── Dockerfile
│   ├── docker-compose.yml
│
├── notebooks/                 # optional exploration
│
├── tests/
│
├── README.md

```