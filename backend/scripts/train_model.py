from app.core.logger import logger

from app.ml.data_loader import load_dataset
from app.ml.preprocessing import (
    split_features_target,
    encode_target,
)
from app.ml.trainer import (
    split_data,
    train_model,
)
from app.ml.evaluator import evaluate
from app.ml.artifacts import save_artifact


def main():
    # ==========================
    # Load Dataset
    # ==========================
    logger.info("Loading dataset...")
    df = load_dataset()

    # ==========================
    # Preprocessing
    # ==========================
    logger.info("Splitting features and target...")
    X, y = split_features_target(df)

    logger.info("Encoding disease labels...")
    y_encoded, encoder = encode_target(y)

    # ==========================
    # Train-Test Split
    # ==========================
    logger.info("Creating train-test split...")
    X_train, X_test, y_train, y_test = split_data(
        X,
        y_encoded,
    )

    # ==========================
    # Model Training
    # ==========================
    logger.info("Training XGBoost model...")
    model = train_model(
        X_train,
        y_train,
    )

    # ==========================
    # Model Evaluation
    # ==========================
    logger.info("Evaluating model...")
    metrics = evaluate(
        model,
        X_test,
        y_test,
    )

    # ==========================
    # Save Artifacts
    # ==========================
    logger.info("Saving model artifacts...")

    save_artifact(
        model,
        "xgb_model.pkl",
    )

    save_artifact(
        encoder,
        "label_encoder.pkl",
    )

    save_artifact(
        list(X.columns),
        "features.pkl",
    )

    # ==========================
    # Training Summary
    # ==========================
    logger.info("Training completed successfully!")

    print("\n========== Training Summary ==========")
    print(f"Accuracy : {metrics['accuracy']:.4f}")
    print(f"Precision: {metrics['precision']:.4f}")
    print(f"Recall   : {metrics['recall']:.4f}")
    print(f"F1 Score : {metrics['f1_score']:.4f}")
    print("======================================\n")


if __name__ == "__main__":
    main()