from fastapi import APIRouter
from app.services.embedding_service import generate_embedding
from app.services.vector_store import search_similar
from app.services.retrival_service import build_context 
from app.services.llm_service import generate_answer
from app.services.logging_service import log_query
router = APIRouter()

@router.get("/query")
def query_docs(question:str):
    #convert the question into embeddings
    query_embedding = generate_embedding(question)

    # retricve the most coloest answer to the question
    result = search_similar(query_embedding)

    context = build_context(result)

    answer = generate_answer(
        question=question,
        context=context
    )

    log_query(question, answer)

    return{
        "question":question,
        "answer":answer,
        "context":context
    }
