from fastapi import APIRouter
from app.services.embedding_service import generate_embedding
from app.services.vector_store import search_similar
from app.services.retrival_service import build_context 

router = APIRouter()

@router.get("/query")
def query_docs(question:str):
    #convert the question into embeddings
    query_embedding = generate_embedding(question)

    # retricve the most coloest answer to the question
    result = search_similar(query_embedding)

    context = build_context(result)

    return{
        "question":question,
        "result":result,
        "context":context
    }
