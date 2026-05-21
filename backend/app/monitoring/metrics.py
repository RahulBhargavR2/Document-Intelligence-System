from collections import defaultdict

metrics = {
    "total_queries": 0,
    "total_uploads": 0,
    "cache_hits": 0,
    "cache_misses": 0,
    "average_latency": 0,
    "latencies": [],
    "query_history": [],
    "errors": 0,
}
