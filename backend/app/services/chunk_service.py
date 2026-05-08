from typing import List
import re


# replace all white space, tab, newline multiple with sigle white space

def clean_text(text:str) -> str:

    cleaned = re.sub(r"\s+"," ",text)

    return clean_text.strip()


def chunk_text(text:str, source:str, chunk_size: int = 500, overlap: int = 100) -> List[str]:
    chunks = []

    start = 0
    text_len = len(text)
    chunk_id = 0
    while start < text_len:

        end = start + chunk_size

        chunk = text[start:end]

        chunks.append({
            "chunk_id":chunk_id,
            "text":chunk,
            "source":source
        })
        chunk_id += 1
        start += chunk_size - overlap
    
    return chunks


