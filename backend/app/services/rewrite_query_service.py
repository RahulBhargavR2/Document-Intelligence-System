from openai import OpenAI
from dotenv import load_dotenv
import os

load_dotenv()

client = OpenAI(
    base_url="https://openrouter.ai/api/v1",
    api_key=os.getenv("API_KEY"),
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
        model=os.getenv("MODEL"),
         messages=[
            {
                "role": "user",
                "content": prompt
            }
        ],
        temperature=0
    )

    return response.choices[0].message.content.strip()