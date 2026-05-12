import faiss
import numpy as np

dimension = 384

index = faiss.IndexFlatL2(dimension)

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
    

    distance, indices = index.search(query_vector,top_k)

    result = []

    for idx in indices[0]:
        if 0 <= idx < len(chunk_store):
            result.append(chunk_store[idx])

    return result
