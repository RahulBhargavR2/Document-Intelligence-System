from fastapi import FastAPI
from contextlib import asynccontextmanager
from fastapi.middleware.cors import CORSMiddleware

from app.api.upload import router as upload_router
from app.api.query import router as query_router
from app.api.documents import router as document_router

from app.services.bm25_service import load_bm25

from app.api.health import router as health_router

from app.core.logger import logger
from app.api.metrics import router as metrics_router
from app.core.config import settings

import time

@asynccontextmanager
async def lifespan(app: FastAPI):
    if not settings.OPENAI_API_KEY:
        raise ValueError(
            "Missing API key"
        )
    logger.info("Initializing BM25...")

    load_bm25()

    logger.info("BM25 initialized successfully")

    yield


app = FastAPI(lifespan=lifespan)


@app.middleware("http")
async def log_requests(request, call_next):

    start_time = time.time()

    response = await call_next(request)

    duration = time.time() - start_time

    logger.info(
        f"{request.method} " f"{request.url.path} " f"completed in " f"{duration:.2f}s"
    )

    return response


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
app.include_router(health_router)
app.include_router(metrics_router)

@app.get("/")
def home():
    return {"message": "RAG system running 🚀"}
