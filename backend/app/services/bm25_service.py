from rank_bm25 import BM25Okapi
from app.services.vector_store import get_all_chunks
bm25 = None


documents = []


def load_bm25():

    chunks = get_all_chunks()

    if not chunks:
        return

    initialize_bm25(chunks)


def initialize_bm25(chunks):
    global bm25
    global documents

    documents = [chunk['text'].split() for chunk in chunks]

    bm25 = BM25Okapi(documents)


def bm25_search(query,chunks,top_k = 5):
    tokenized_query = query.split()


    scores = bm25.get_scores(tokenized_query)

    ranked_indices = sorted(
        range(len(scores)),
        key= lambda i: scores[i],
        reverse=True
    )

    results = []

    for idx in ranked_indices[:top_k]:
        results.append({
            "score":float(scores[idx]),
            "chunk":chunks[idx]
        })
    return results