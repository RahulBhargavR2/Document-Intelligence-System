from sentence_transformers import SentenceTransformer
from app.core.config import settings



model = SentenceTransformer(settings.EMBEDDING_MODEL)


def generate_embedding(text:str):
    embedding = model.encode(text)
    return embedding

