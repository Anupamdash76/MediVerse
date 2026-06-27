from dataclasses import dataclass
from typing import List

import pandas as pd


@dataclass
class SymptomMatch:
    """
    Represents one semantic symptom match.
    """

    input: str
    matched: str
    score: float


@dataclass
class ParserResult:
    """
    Final output of the semantic parser.
    """

    feature_vector: pd.DataFrame
    matches: List[SymptomMatch]