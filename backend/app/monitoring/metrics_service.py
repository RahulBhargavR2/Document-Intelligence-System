from app.monitoring.metrics import metrics

def record_query(question,latency,cached=False):
    metrics["total_queries"] += 1

    metrics["latencies"].append(latency)

    if cached:
        metrics["cache_hits"] += 1
    else:
        metrics["cache_misses"] += 1
    
    metrics['average_latency'] = (
        sum(metrics['latencies'])
        /
        len(metrics['latencies'])
    )

def record_upload(count=1):
    metrics["total_uploads"] += count

def record_error():
    metrics["errors"] += 1