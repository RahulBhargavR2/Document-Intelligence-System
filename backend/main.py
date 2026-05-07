from fastapi import FastAPI

from app.api.upload import router as upload_router


app = FastAPI()
app.include_router(upload_router)

@app.get("/")
def home():
    return {"message": "RAG system running 🚀"}

@app.get("/health")
def health():
    return {"status": "OK"}