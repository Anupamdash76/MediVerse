import pandas as pd

from app.config.paths import DATASET_DIR


def load_dataset(filename: str = "Training.csv") -> pd.DataFrame:
    """
    Load dataset from the dataset directory.

    Args:
        filename (str): Name of the CSV file.

    Returns:
        pd.DataFrame: Loaded dataset.
    """

    dataset_path = DATASET_DIR / filename

    df = pd.read_csv(dataset_path)

    return df