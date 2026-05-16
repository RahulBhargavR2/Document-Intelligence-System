from openai import OpenAI
import os
from app.core.config import settings


client = OpenAI(
  base_url=settings.BASE_URL,
  api_key= settings.OPENAI_API_KEY,
)

def generate_answer(question:str,context:str):
    prompt = f"""
    You are an intelligent document assistant.

    Use ONLY the provided context.

    Rules:
    - Do not hallucinate
    - If information is missing, clearly say so
    - Cite relevant sources when possible
    - Keep answers concise but accurate

    Context:
    {context}

    Question:
    {question}
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


    return response.choices[0].message.content