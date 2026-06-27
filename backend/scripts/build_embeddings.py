from app.ml.artifacts import save_artifact
from app.ml.data_loader import load_dataset
from app.ml.preprocessing import split_features_target
from app.nlp.embeddings import EmbeddingGenerator

import torch

from app.config.paths import MODEL_DIR


def main():

    df = load_dataset()

    X, _ = split_features_target(df)

    symptoms = list(X.columns)

    generator = EmbeddingGenerator()

    embeddings = generator.build(symptoms)

    torch.save(
        embeddings,
        MODEL_DIR / "symptom_embeddings.pt",
    )

    save_artifact(
        symptoms,
        "symptom_list.pkl",
    )

    print("Embeddings generated successfully!")


if __name__ == "__main__":
    main()