import numpy as np
import pandas as pd
import torch

from app.config.paths import MODEL_DIR
from app.nlp.embedder import SentenceEmbedder
from app.nlp.similarity import SimilarityEngine
from app.nlp.utils import load_artifact


class SymptomParser:
    """
    Converts free-text symptoms into a machine-learning
    feature vector using semantic similarity.
    """

    def __init__(self):

        # Load embedding model
        self.embedder = SentenceEmbedder()

        # Load feature names (132 symptoms)
        self.features = load_artifact(
            "features.pkl"
        )

        # Load precomputed symptom embeddings
        self.symptom_embeddings = torch.load(
            MODEL_DIR / "symptom_embeddings.pt"
        )

        # Similarity engine
        self.similarity_engine = SimilarityEngine(
            self.symptom_embeddings
        )

    def parse(self, symptoms: str) -> dict:
        """
        Parse user symptoms into a feature vector.

        Parameters
        ----------
        symptoms : str
            Comma separated symptom string.

        Example
        -------
        "headache, vomiting"

        Returns
        -------
        dict

        {
            "feature_vector": DataFrame,
            "matches": [
                {
                    "input": "...",
                    "matched": "...",
                    "score": ...
                }
            ]
        }
        """

        # Create empty feature vector
        feature_vector = pd.DataFrame(
            np.zeros((1, len(self.features))),
            columns=self.features,
        )

        matched_results = []

        if not symptoms.strip():
            return {
                "feature_vector": feature_vector,
                "matches": matched_results,
            }

        symptom_list = symptoms.split(",")

        activated_features = set()

        for symptom in symptom_list:

            symptom = symptom.strip()

            if not symptom:
                continue

            # Generate embedding
            embedding = self.embedder.encode(symptom)

            # Find Top-K semantic matches
            matches = self.similarity_engine.find_matches(
                embedding
            )

            for match in matches:

                matched_feature = self.features[
                    match["index"]
                ]

                # Prevent duplicate activation
                if matched_feature in activated_features:
                    continue

                activated_features.add(
                    matched_feature
                )

                feature_vector.loc[
                    0,
                    matched_feature,
                ] = 1

                matched_results.append(
                    {
                        "input": symptom,
                        "matched": matched_feature,
                        "score": round(
                            match["score"],
                            4,
                        ),
                    }
                )

        return {
            "feature_vector": feature_vector,
            "matches": matched_results,
        }