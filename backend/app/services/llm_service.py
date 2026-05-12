from openai import OpenAI
from dotenv import load_dotenv
import os

load_dotenv()

client = OpenAI(
  base_url="https://openrouter.ai/api/v1",
  api_key= os.getenv("API_KEY"),
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
        model="openai/gpt-oss-20b:free",
        messages=[
            {
            "role": "user",
            "content": prompt
            }
        ],
        temperature=0   
    )   


    return response.choices[0].message.content

