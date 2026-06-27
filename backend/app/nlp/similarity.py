import torch
from sentence_transformers import util

from app.config.settings import (
    TOP_K,
    SIMILARITY_THRESHOLD,
)


class SimilarityEngine:
    """
    Computes semantic similarity between
    user symptoms and dataset symptoms.
    """

    def __init__(self, symptom_embeddings):
        self.symptom_embeddings = symptom_embeddings

    def find_matches(
        self,
        query_embedding,
    ):

        cosine_scores = util.pytorch_cos_sim(
            query_embedding,
            self.symptom_embeddings,
        )[0]

        scores, indices = torch.topk(
            cosine_scores,
            k=TOP_K,
        )

        matches = []

        for score, index in zip(scores, indices):

            score = float(score)

            if score >= SIMILARITY_THRESHOLD:

                matches.append(
                    {
                        "index": int(index),
                        "score": score,
                    }
                )

        return matches