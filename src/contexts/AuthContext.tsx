import { createContext, useEffect, useState } from "react";
import type { layouts } from "../types/layouts";
import type { IAuthContext } from "../types/contexts";

const AuthContext = createContext<IAuthContext | undefined>(undefined);

const AuthProvider = ({ children }: layouts) => {
  const [isLogged, setIsLogged] = useState(false);
  const [username, setUsername] = useState("");

  const handleLogin = () => {
    fetch("http://localhost:8080/users/username", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.text();
        }
      })
      .then((data) => {
        if (data) {
          setUsername(data);
          setIsLogged(true);
        }
      });
  };

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setIsLogged(false);
    setUsername("");
  };

  useEffect(() => {
    handleLogin();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLogged,
        setIsLogged,
        username,
        setUsername,
        handleLogin,
        handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
