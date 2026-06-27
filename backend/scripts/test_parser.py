from app.nlp.parser import SymptomParser

parser = SymptomParser()

result = parser.parse(
    "headache, vomiting"
)

print("\nDetected Semantic Matches\n")

for match in result["matches"]:
    print(match)

print("\nActivated Features\n")

print(
    result["feature_vector"].loc[
        :,
        (result["feature_vector"] != 0).any(axis=0)
    ]
)