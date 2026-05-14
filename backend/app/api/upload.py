from fastapi import APIRouter, UploadFile, File, HTTPException
import os

from app.services.pdf_service import extract_text_from_pdf
from app.services.chunk_service import chunk_text

from app.services.embedding_service import generate_embedding
from app.services.vector_store import add_embedding, get_all_chunks

from app.services.document_service import document_exists, register_document

from app.services.bm25_service import initialize_bm25


router = APIRouter()

UPLOAD_DIR = "uploads"

# create upload folder if dosent exist

os.makedirs(UPLOAD_DIR, exist_ok=True)

# router that takes file and extracts the contents and write it to loacl drive


@router.post("/upload")
async def upload(file: UploadFile = File(...)):
    try:
        if not file.filename.endswith(".pdf"):

            raise HTTPException(
                status_code=400,
                detail="Only PDF files are allowed"
            )
        
        if document_exists(file.filename):
            return {"message": "Document already uploaded"}

        # create the file path ex: uploads/filename
        file_path = os.path.join(UPLOAD_DIR, file.filename)

        # read the contents of the file and write it to local disk
        with open(file_path, "wb") as f:
            content = await file.read()
            f.write(content)

        # extract the text using pymppdf
        extracted_text = extract_text_from_pdf(file_path)

        # divide the huge text into small chunks
        chunks = chunk_text(text=extracted_text, source=file.filename)

        
        # Embed the chunks
        for chunk in chunks:
            embedding = generate_embedding(chunk["text"])
            add_embedding(embedding=embedding, chunk_data=chunk)
        
        # bm25 for keyword search

        all_chunks = get_all_chunks()
        initialize_bm25(chunks=all_chunks)

        register_document(file.filename)


        chunk_lengths = [
        len(chunk["text"])
        for chunk in chunks
        ]

        avg_chunk_size = sum(chunk_lengths) / len(chunk_lengths)

        # return filename,length and preview in JSON
        return {
            "filename": file.filename,
            "total_chunks": len(chunks),
            "text_preview": chunks[0] if chunks else None,
            "avg_chunk_size": avg_chunk_size
        }
    except Exception as e:
          raise HTTPException(
            status_code=500,
            detail=str(e)
        )