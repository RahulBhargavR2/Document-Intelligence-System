import faiss
import numpy as np

dimension = 384

# brute force index searching
index = faiss.IndexFlatL2(dimension)

# store the actual chunks (retrived after search)
chunk_store = []

# store the embedding and its respective data in array along with respective index
# index stores the embeddings as vector0,vector1  
def add_embedding(embedding,chunk_data):
    vector = np.array([embedding]).astype('float32')

    index.add(vector)

    chunk_store.append(chunk_data)


def search_similar(query_embedding,top_k = 3):
    # storing as [query_embedding] as index search takes query as batches(batch,384)
    # where batch specifies no of queries that is provided for search
    query_vector = np.array([query_embedding]).astype('float32')
    

    # distance and indices of the queries shape of result (no_of_queries,top_k)
    # if top_k is > index length negative values are given
    distance, indices = index.search(query_vector,top_k)

    result = []

    for i, idx in enumerate(indices[0]):
        score = float(distances[0][i])
        # to make sure range wont exceed length and below zero
        if 0 <= idx < len(chunk_store) and score < 1.5:
            result.append({
                "score":score,
                "chunk":chunk_store[idx]
                })

    return result
