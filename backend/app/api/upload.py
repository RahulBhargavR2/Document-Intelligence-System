from fastapi import APIRouter,UploadFile,File
import os

from app.services.pdf_service import extract_text_from_pdf

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

    
    # return filename,length and preview in JSON
    return{
        "filename":file.filename,
        "text_length":len(extract_text),
        "text_preview":extract_text[:1000],
    }