from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def home():
    return {"message": "RAG system running 🚀"}

@app.get("/health")
def health():
    return {"status": "OK"}