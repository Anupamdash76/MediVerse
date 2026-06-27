from sklearn.preprocessing import LabelEncoder


def split_features_target(df):
    """
    Separate features (X) and target (y).
    """

    X = df.drop(columns=["prognosis"])
    y = df["prognosis"]

    return X, y


def encode_target(y):
    """
    Encode disease labels into integers.
    """

    encoder = LabelEncoder()

    y_encoded = encoder.fit_transform(y)

    return y_encoded, encoder