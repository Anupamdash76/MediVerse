from pathlib import Path

# Backend root directory
BASE_DIR = Path(__file__).resolve().parents[2]

# Dataset directory
DATASET_DIR = BASE_DIR / "dataset"

# Model directory
MODEL_DIR = BASE_DIR / "models"

# Scripts directory
SCRIPT_DIR = BASE_DIR / "scripts"