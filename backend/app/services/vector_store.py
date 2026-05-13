import faiss
import numpy as np
import json
import os

INDEX_PATH = "storage/faiss_index.bin"
CHUNKS_PATH = "storage/chunks.json"

dimension = 384

# brute force index searching


# store the actual chunks (retrived after search)
chunk_store = []


if os.path.exists(INDEX_PATH):
    index = faiss.read_index(INDEX_PATH)
    with open(CHUNKS_PATH,"r") as f:
        chunk_store = json.load(f)
else:
    index = faiss.IndexFlatL2(dimension)


def save_index():
    faiss.write_index(index,INDEX_PATH)
    with open(CHUNKS_PATH,"w") as f:
        json.dump(chunk_store,f)

# store the embedding and its respective data in array along with respective index
# index stores the embeddings as vector0,vector1  
def add_embedding(embedding,chunk_data):
    vector = np.array([embedding]).astype('float32')

    index.add(vector)

    chunk_store.append(chunk_data)

    save_index()


def search_similar(query_embedding,top_k = 3):
    # storing as [query_embedding] as index search takes query as batches(batch,384)
    # where batch specifies no of queries that is provided for search
    query_vector = np.array([query_embedding]).astype('float32')
    

    # distance and indices of the queries shape of result (no_of_queries,top_k)
    # if top_k is > index length negative values are given
    distance, indices = index.search(query_vector,top_k)

    result = []

    for i, idx in enumerate(indices[0]):
        score = float(distance[0][i])
        # to make sure range wont exceed length and below zero
        if 0 <= idx < len(chunk_store) and score < 1.5:
            result.append({
                "score":score,
                "chunk":chunk_store[idx]
                })

    return result


def get_all_chnuks():
    return chunk_store

