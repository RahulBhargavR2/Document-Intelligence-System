query_cache = {}

def get_cached_response(query):
    return query_cache.get(query)

def cache_response(query,answer):
    query_cache[query] = answer