from fastapi import APIRouter,UploadFile,File
import os

from app.services.pdf_service import extract_text_from_pdf
from app.services.chunk_service import chunk_text

from app.services.embedding_service import generate_embedding
from app.services.vector_store import add_embedding

router = APIRouter()

UPLOAD_DIR = "uploads"

# create upload folder if dosent exist

os.makedirs(UPLOAD_DIR,exist_ok=True)

# router that takes file and extracts the contents and write it to loacl drive

@router.post("/upload")
async def upload(file: UploadFile = File(...)):
    # create the file path ex: uploads/filename
    file_path = os.path.join(UPLOAD_DIR,file.filename)


    # read the contents of the file and write it to local disk
    with open(file_path,"wb") as f:
        content = await file.read()
        f.write(content)
    
    # extract the text using pymppdf
    extract_text = extract_text_from_pdf(file_path)

    # divide the huge text into small chunks
    chunks = chunk_text(text=extract_text,source=file.filename)

    for chunk in chunks:
        embedding = generate_embedding(chunk['text'])
        add_embedding(embedding=embedding,chunk_data=chunk)

    
    # return filename,length and preview in JSON
    return{
        "filename":file.filename,
        "text_length":len(chunks),
        "text_preview":chunks[0],
    }