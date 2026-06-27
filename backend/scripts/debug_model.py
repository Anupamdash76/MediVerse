from app.ml.predictor import DiseasePredictor
from app.nlp.parser import SymptomParser


def main():

    parser = SymptomParser()
    predictor = DiseasePredictor()

    symptoms = input("Enter symptoms: ")

    parser_result = parser.parse(symptoms)

    print("\n" + "=" * 70)
    print("Activated Features")
    print("=" * 70)

    active_features = parser_result.feature_vector.loc[
        :,
        (parser_result.feature_vector != 0).any(axis=0),
    ]

    print(active_features)

    print("\nNumber of active symptoms:", active_features.shape[1])

    print("\n" + "=" * 70)
    print("Prediction")
    print("=" * 70)

    disease, confidence = predictor.predict(
        parser_result.feature_vector
    )

    print(f"Disease   : {disease}")
    print(f"Confidence: {confidence:.2f}%")

    print("\n" + "=" * 70)
    print("Top 5 Predictions")
    print("=" * 70)

    probabilities = predictor.model.predict_proba(
        parser_result.feature_vector
    )[0]

    top_indices = probabilities.argsort()[::-1][:5]

    for index in top_indices:

        disease_name = predictor.encoder.inverse_transform([index])[0]

        print(
            f"{disease_name:<40} "
            f"{probabilities[index] * 100:.2f}%"
        )


if __name__ == "__main__":
    main()