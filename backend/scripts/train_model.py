import os
import joblib
import pandas as pd

from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.metrics import accuracy_score, classification_report

from xgboost import XGBClassifier



# Load Dataset

df = pd.read_csv("dataset/Training.csv")

X = df.drop("prognosis", axis=1)
y = df["prognosis"]



# Encode Target


label_encoder = LabelEncoder()
y_encoded = label_encoder.fit_transform(y)



# Train Test Split


X_train, X_test, y_train, y_test = train_test_split(
    X,
    y_encoded,
    test_size=0.2,
    random_state=42,
    stratify=y_encoded
)



# Train Model


model = XGBClassifier(
    objective="multi:softprob",
    eval_metric="mlogloss",
    random_state=42
)

model.fit(X_train, y_train)



# Evaluate


predictions = model.predict(X_test)

accuracy = accuracy_score(y_test, predictions)

print(f"\nAccuracy : {accuracy:.4f}\n")

print(classification_report(y_test, predictions))



# Save Model


os.makedirs("models", exist_ok=True)

joblib.dump(model, "models/xgb_model.pkl")

joblib.dump(label_encoder, "models/label_encoder.pkl")

print("\n Model Saved")