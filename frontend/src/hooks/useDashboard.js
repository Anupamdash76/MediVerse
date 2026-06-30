import { useEffect, useState } from "react";

import { getDashboardData } from "../services/dashboardService";

export default function useDashboard() {

  const [loading, setLoading] = useState(true);

  const [stats, setStats] = useState({
    totalPredictions: 0,
    latestDisease: "-",
    profileCompletion: 0,
    history: [],
  });

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {

    try {

      const { history, profile } =
        await getDashboardData();

      let completion = 0;

      if (profile) {

        const fields = [
          "age",
          "gender",
          "height_cm",
          "weight_kg",
          "blood_group",
          "allergies",
          "chronic_diseases",
          "current_medications",
        ];

        const completed = fields.filter((field) => {

          const value = profile[field];

          if (Array.isArray(value)) {
            return value.length > 0;
          }

          return value !== "" &&
            value !== null &&
            value !== undefined;

        }).length;

        completion = Math.round(
          (completed / fields.length) * 100
        );

      }

      setStats({

        totalPredictions: history.length,

        latestDisease:
          history.length > 0
            ? history[0].predictions[0].disease.replaceAll("_", " ")
            : "-",

        profileCompletion: completion,

        history,

      });

    }

    finally {

      setLoading(false);

    }

  }

  return {
    loading,
    stats,
    reload: loadDashboard,
  };

}