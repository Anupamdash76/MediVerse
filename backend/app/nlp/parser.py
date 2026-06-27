import numpy as np
import pandas as pd
import torch

from app.config.paths import MODEL_DIR
from app.nlp.embedder import SentenceEmbedder
from app.nlp.similarity import SimilarityEngine
from app.nlp.utils import load_artifact

from app.schema.parser import (
    ParserResult,
    SymptomMatch,
)


class SymptomParser:
    """
    Converts natural language symptoms into
    a machine-learning feature vector using
    semantic similarity.
    """

    def __init__(self):

        self.embedder = SentenceEmbedder()

        self.features = load_artifact(
            "features.pkl"
        )

        self.symptom_embeddings = torch.load(
            MODEL_DIR / "symptom_embeddings.pt"
        )

        self.similarity_engine = SimilarityEngine(
            self.symptom_embeddings
        )

    def parse(
        self,
        symptoms: str,
    ) -> ParserResult:

        feature_vector = pd.DataFrame(
            np.zeros((1, len(self.features))),
            columns=self.features,
        )

        matched_results = []

        if not symptoms.strip():

            return ParserResult(
                feature_vector=feature_vector,
                matches=[],
            )

        symptom_list = symptoms.split(",")

        activated = set()

        for symptom in symptom_list:

            symptom = symptom.strip()

            if not symptom:
                continue

            embedding = self.embedder.encode(
                symptom
            )

            matches = self.similarity_engine.find_matches(
                embedding
            )

            for match in matches:

                feature_name = self.features[
                    match["index"]
                ]

                if feature_name in activated:
                    continue

                activated.add(feature_name)

                feature_vector.loc[
                    0,
                    feature_name,
                ] = 1

                matched_results.append(
                    SymptomMatch(
                        input=symptom,
                        matched=feature_name,
                        score=round(
                            match["score"],
                            4,
                        ),
                    )
                )

        return ParserResult(
            feature_vector=feature_vector,
            matches=matched_results,
        )