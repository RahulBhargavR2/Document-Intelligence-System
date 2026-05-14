from fastapi import APIRouter
from app.services.embedding_service import generate_embedding
from app.services.retrival_service import build_context, hybrid_search
from app.services.llm_service import generate_answer
from app.services.logging_service import log_query
from app.services.rewrite_query_service import rewrite_query
from app.services.cache_service import cache_response,get_cached_response

router = APIRouter()

@router.get("/query")
def query_docs(question:str,source:str = None):

    cached_response = get_cached_response(question)

    if cached_response:
        return {
            "cached": True,
            **cached_response
        }

    rewritten_query = rewrite_query(question)
    #convert the question into embeddings
    query_embedding = generate_embedding(rewritten_query)

    # retrive the most coloest answer to the question
    results = hybrid_search(
        query=rewritten_query,
        query_embedding= query_embedding,
        source=source
    )

    context = build_context(results)

    answer = generate_answer(
        question=question,
        context=context
    )

    log_query(question, rewritten_query,answer)

    resonse_data ={
        "cached": False,
        "question":question,
        "source_filter":source,
        "rewritten_query":rewritten_query,
        "answer":answer,
        "sources":results
    }

    cache_response(question, resonse_data)

    return resonse_data
