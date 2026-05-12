import json
from datetime import datetime


def log_query(question, answer):

    log_data = {
        "timestamp": str(datetime.now()),
        "question": question,
        "answer": answer
    }

    with open("query_logs.jsonl", "a") as f:

        f.write(json.dumps(log_data) + "\n")