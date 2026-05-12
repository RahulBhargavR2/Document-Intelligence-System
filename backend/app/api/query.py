from fastapi import APIRouter
from app.services.embedding_service import generate_embedding
from app.services.vector_store import search_similar

router = APIRouter()

@router.get("/query")
def query_docs(question:str):
    query_embedding = generate_embedding(question)

    result = search_similar(query_embedding)

    return{
        "question":question,
        "result":result
    }
