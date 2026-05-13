from app.services.vector_store import search_similar, get_all_chnuks
from app.services.bm25_service import bm25_search
from app.services.reranker_service import rerank_results



def build_context(resluts):
    context_parts = []

    for reslut in resluts:
        chunk = reslut["chunk"]

        text = chunk["text"]

        source = chunk["source"]

        context_parts.append(f"{source}\n{text}")
    context = "\n\n".join(context_parts)
    return context


def hybrid_search(
        query,
        query_embedding, 
        top_k=5,
        source = None
    ):

    semantic_result = search_similar(query_embedding, top_k)

    bm25_result = bm25_search(query, get_all_chnuks(), top_k)

    combined_results = semantic_result + bm25_result

    seen_texts = set()

    unique_results = []

    for result in combined_results:
        chunk_test = result["chunk"]["text"]

        if chunk_test not in seen_texts:
            seen_texts.add(chunk_test)

            unique_results.append(result)
    
    filtered_results = filter_by_source(unique_results,source=source)

    reranked_results = rerank_results(query, filtered_results, top_k=3)
    return reranked_results


def filter_by_source(resluts, source=None):
    if source is None:
        return resluts
    filter = []

    for result in resluts:
        chunk_source = result["chunk"]["source"]

        if chunk_source == source:
            filter.append(result)

    return filter
