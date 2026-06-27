import joblib

from app.config.paths import MODEL_DIR


def save_artifact(obj, filename):
    joblib.dump(
        obj,
        MODEL_DIR / filename,
    )


def load_artifact(filename):
    return joblib.load(
        MODEL_DIR / filename,
    )