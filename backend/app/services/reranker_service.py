from sentence_transformers import CrossEncoder
from app.core.config import settings

reranker = CrossEncoder(
    settings.RERANKER_MODEL
)

def rerank_results(query,results,top_k = 3):
    pairs = []

    for result in results:
        chunk_text = result['chunk']['text']
        pairs.append((query,chunk_text))
    
    scores = reranker.predict(pairs)

    reranked = []

    for score, result in zip(scores,results):
        reranked.append({
            "reranked_score": float(score),
            "chunk":result["chunk"]
        })
    
    reranked.sort(
        key = lambda x: x["reranked_score"],
        reverse=True
    )

    return reranked[:top_k]
    
