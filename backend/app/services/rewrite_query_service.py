from openai import OpenAI
import os
from app.core.config import settings



client = OpenAI(
    base_url =  settings.BASE_URL,
    api_key= settings.OPENAI_API_KEY,
)


def rewrite_query(query: str):
    prompt = f"""
   You are a search query optimizer for a RAG system.

    Rewrite the query to improve document retrieval.

    Rules:
    - Preserve original meaning
    - Expand abbreviations if useful
    - Keep concise
    - Do not answer the query
    - Return ONLY the rewritten query

    Query:
    {query}
    """

    response = client.chat.completions.create(
        model=settings.LLM_MODEL,
         messages=[
            {
                "role": "user",
                "content": prompt
            }
        ],
        temperature=0
    )

    return response.choices[0].message.content.strip()