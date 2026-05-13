from typing import List
import re

import nltk

from nltk.tokenize import sent_tokenize


# replace all white space, tab, newline multiple with sigle white space

def clean_text(text:str) -> str:

    cleaned = re.sub(r"\s+"," ",text)

    return cleaned.strip()


def chunk_text(text:str, source:str, chunk_size: int = 500) -> List[Dict]:

    text = clean_text(text)
    sentences = sent_tokenize(text)

    chunks = []

    current_chunk = ""

    chunk_id = 0

    for sentence in sentences:

        if len(current_chunk) + len(sentence) < chunk_size:
            current_chunk += " " + sentence
        else:

            chunks.append({
                "chunk_id":chunk_id,
                "text":current_chunk.strip(),
                "source":source
            })
        
            chunk_id += 1
            current_chunk = sentence
    

    if current_chunk:
        chunks.append({
            "chunk_id": chunk_id,
            "text": current_chunk.strip(),
            "source": source
        })
    
    return chunks


