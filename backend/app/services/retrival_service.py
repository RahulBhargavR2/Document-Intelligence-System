def build_context(resluts):
    context_parts = []

    for reslut in resluts:
        chunk = reslut['chunk']

        text = chunk['text']

        source = chunk['source']

        context_parts.append(f"{source}\n{text}")
    context = "\n\n".join(context_parts)
    return context