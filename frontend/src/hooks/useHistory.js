import { useEffect, useState } from "react";

import {
  getHistory,
  deleteHistory,
} from "../services/historyService";

export default function useHistory() {
  const [history, setHistory] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  useEffect(() => {
    loadHistory();
  }, []);

  async function loadHistory() {
    try {
      setLoading(true);

      const data = await getHistory();

      setHistory(data);

      setError("");
    } catch (err) {
      setError(
        err.response?.data?.detail ||
          "Failed to load history."
      );
    } finally {
      setLoading(false);
    }
  }

  async function removePrediction(id) {
    await deleteHistory(id);

    setHistory((previous) =>
      previous.filter((item) => item.id !== id)
    );
  }

  return {
    history,
    loading,
    error,
    removePrediction,
    reload: loadHistory,
  };
}