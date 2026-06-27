from sklearn.model_selection import train_test_split
from xgboost import XGBClassifier


def split_data(X, y, test_size=0.2, random_state=42):
    return train_test_split(
        X,
        y,
        test_size=test_size,
        random_state=random_state,
        stratify=y,
    )


def train_model(X_train, y_train):

    model = XGBClassifier(
        objective="multi:softprob",
        eval_metric="mlogloss",
        n_estimators=200,
        learning_rate=0.1,
        max_depth=6,
        random_state=42,
    )

    model.fit(
        X_train,
        y_train,
    )

    return model