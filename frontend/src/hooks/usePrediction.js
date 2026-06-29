  import { useState } from "react";
  import { predictDisease } from "../services/predictionService";

  export default function usePrediction() {
    const [loading, setLoading] = useState(false);
    const [prediction, setPrediction] = useState(null);
    const [error, setError] = useState("");

    const predict = async (symptoms) => {
      if (!symptoms.trim()) {
        setError("Please enter your symptoms.");
        return null;
      }

      try {
        setLoading(true);
        setError("");

        const response = await predictDisease(symptoms);

        setPrediction(response);

        return response;
      } catch (err) {
        console.error(err);

        if (err.response?.data?.detail) {
          setError(err.response.data.detail);
        } else {
          setError("Unable to connect to the server.");
        }

        return null;
      } finally {
        setLoading(false);
      }
    };

    const reset = () => {
      setPrediction(null);
      setError("");
      setLoading(false);
    };

    return {
      loading,
      prediction,
      error,
      predict,
      reset,
    };
  }