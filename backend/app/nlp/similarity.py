import torch
from sentence_transformers import util

from app.config.settings import (
    TOP_K,
    SIMILARITY_THRESHOLD,
)


class SimilarityEngine:
    """
    Computes semantic similarity between
    the user's symptom and all dataset symptoms.
    """

    def __init__(self, symptom_embeddings):
        self.symptom_embeddings = symptom_embeddings

    def find_matches(self, query_embedding):
        """
        Returns the Top-K semantic matches above
        the configured similarity threshold.

        Returns
        -------
        list

        [
            {
                "index": 12,
                "score": 0.94,
            },
            ...
        ]
        """

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

            if score < SIMILARITY_THRESHOLD:
                continue

            matches.append(
                {
                    "index": int(index),
                    "score": score,
                }
            )

        return matches