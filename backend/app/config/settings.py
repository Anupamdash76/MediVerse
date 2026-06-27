"""
Application settings for the NLP pipeline.

Keep all configurable ML/NLP constants here.
"""


# Number of semantic matches to retrieve
TOP_K = 3


# Minimum cosine similarity score required
# for a symptom to be considered a match.
SIMILARITY_THRESHOLD = 0.75