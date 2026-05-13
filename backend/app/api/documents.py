from fastapi import APIRouter
import json


router = APIRouter()

@router.get('/douments')
def get_documents():
    with open("storage/documents.json",'r') as f:
        docs = json.load(f)
    
    return{
        "documents":docs
    }
