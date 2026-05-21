import os
import json

from app.core.config import settings
from app.monitoring.metrics_service import record_upload


DOCS_PATH = settings.DOCUMENTS_PATH

if os.path.exists(DOCS_PATH):
    with open(DOCS_PATH,"r") as f:
        uploaded_docs = json.load(f)
        record_upload(count=len(uploaded_docs))
else:
    uploaded_docs = []


def document_exists(filename):
    return filename in uploaded_docs


def register_document(filename):
    uploaded_docs.append(filename)

    with open(DOCS_PATH,"w") as f:
        json.dump(uploaded_docs,f)
    

