import {
  createContext,
  useEffect,
  useState,
} from "react";

import { getCurrentUser } from "../services/authService";

export const AuthContext = createContext(null);

export default function AuthProvider({
  children,
}) {
  const [user, setUser] = useState(null);

  const [token, setToken] = useState(
    localStorage.getItem("token")
  );

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    async function restoreUser() {

      if (!token) {

        setLoading(false);

        return;

      }

      try {

        const currentUser =
          await getCurrentUser();

        setUser(currentUser);

      }

      catch {

        localStorage.removeItem(
          "token"
        );

        setToken(null);

      }

      finally {

        setLoading(false);

      }

    }

    restoreUser();

  }, [token]);

  const login = (
    authUser,
    authToken,
  ) => {

    localStorage.setItem(
      "token",
      authToken
    );

    setUser(authUser);

    setToken(authToken);

  };

  const logout = () => {

    localStorage.removeItem(
      "token"
    );

    setUser(null);

    setToken(null);

  };

  return (

    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        logout,
        isAuthenticated: !!token,
      }}
    >

      {children}

    </AuthContext.Provider>

  );

}