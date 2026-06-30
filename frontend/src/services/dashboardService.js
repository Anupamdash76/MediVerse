import { getHistory } from "./historyService";
import { getProfile } from "./profileService";

export async function getDashboardData() {
  const [history, profile] = await Promise.allSettled([
    getHistory(),
    getProfile(),
  ]);

  return {
    history:
      history.status === "fulfilled"
        ? history.value
        : [],

    profile:
      profile.status === "fulfilled"
        ? profile.value
        : null,
  };
}