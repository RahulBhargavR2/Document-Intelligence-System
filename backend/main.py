from fastapi import FastAPI
from contextlib import asynccontextmanager
from fastapi.middleware.cors import CORSMiddleware

from app.api.upload import router as upload_router
from app.api.query import router as query_router
from app.api.documents import router as document_router

from app.services.bm25_service import load_bm25

@asynccontextmanager
async def lifespan(app: FastAPI):

    load_bm25()

    print("BM25 initialized successfully")

    yield


app = FastAPI(
    lifespan=lifespan
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(upload_router)
app.include_router(query_router)
app.include_router(document_router)

@app.get("/")
def home():
    return {"message": "RAG system running 🚀"}

@app.get("/health")
def health():
    return {"status": "OK"}