import { useEffect, useState, useCallback } from "react";

import {
  getProfile,
  createProfile,
  updateProfile,
} from "../services/profileService";

export default function useProfile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [profileExists, setProfileExists] = useState(false);

  const loadProfile = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getProfile();
      setProfile(data);
      setProfileExists(true);
      setError("");
    } catch {
      setProfileExists(false);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProfile();
  }, [loadProfile]);

  async function saveProfile(data) {
    try {
      let response;

      if (profileExists) {
        response = await updateProfile(data);
      } else {
        response = await createProfile(data);
        setProfileExists(true);
      }

      setProfile(response);
      return true;
    } catch (err) {
      setError(
        err.response?.data?.detail ||
          "Failed to save profile."
      );
      return false;
    }
  }

  return {
    loading,
    error,
    profile,
    profileExists,
    saveProfile,
  };
}