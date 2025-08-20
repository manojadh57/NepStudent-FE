import { createContext, useContext, useMemo, useState } from "react";

const AuthCtx = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const username = localStorage.getItem("username");
    return username ? { username } : null;
  });

  const login = ({ accessToken, refreshToken, username }) => {
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    localStorage.setItem("username", username);
    setUser({ username });
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("username");
    setUser(null);
  };

  const value = useMemo(
    () => ({ user, isAuthed: !!user, login, logout }),
    [user]
  );
  return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>;
}

export function useAuth() {
  return useContext(AuthCtx);
}
