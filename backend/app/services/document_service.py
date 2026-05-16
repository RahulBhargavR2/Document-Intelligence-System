import os
import json

from app.core.config import settings

DOCS_PATH = settings.DOCUMENTS_PATH

if os.path.exists(DOCS_PATH):
    with open(DOCS_PATH,"r") as f:
        uploaded_docs = json.load(f)
else:
    uploaded_docs = []


def document_exists(filename):
    return filename in uploaded_docs


def register_document(filename):
    uploaded_docs.append(filename)

    with open(DOCS_PATH,"w") as f:
        json.dump(uploaded_docs,f)
    

