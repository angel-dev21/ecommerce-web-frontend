import { useState } from "react";
import { Link } from "react-router";
import useAuth from "../hooks/useAuth";

const AuthMenu = () => {
  const { handleLogin } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorUser, setErrorUser] = useState(false);
  const [errorPass, setErrorPass] = useState(false);
  const [errorLogin, setErrorLogin] = useState(false);

  const verifyFields = () => {
    let errorDetected = false;

    if (username === "" || username.length < 4 || username.length > 20) {
      setErrorUser(true);
      errorDetected = true;
    }

    if (password === "" || password.length < 8 || password.length > 20) {
      setErrorPass(true);
      errorDetected = true;
    }

    return !errorDetected;
  };

  const login = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorLogin(false);

    if (verifyFields()) {
      setLoading(true);
      fetch("http://localhost:8080/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: username, password: password }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Login failed.");
          } else {
            return response.text();
          }
        })
        .then((data) => {
          localStorage.setItem("jwt", data);
          handleLogin();
        })
        .catch(() => setErrorLogin(true))
        .finally(() => setLoading(false));
    }
  };

  return (
    <div className="w-100 absolute right-4 top-20 rounded-2xl bg-surface-dark outline-2 outline-brand-dark">
      <h1 className="flex justify-center mt-2 text-2xl text-gray-800">
        Log In
      </h1>
      <form onSubmit={login} className="flex flex-col justify-center">
        {errorUser && (
          <div className="bg-red-950 text-center">
            Username must be between 4 and 20 characters.
          </div>
        )}
        <input
          type="text"
          value={username}
          placeholder="Username"
          onChange={(e) => {
            setUsername(e.target.value);
            setErrorLogin(false);
            if (
              e.target.value !== "" &&
              e.target.value.length >= 4 &&
              e.target.value.length <= 20
            ) {
              setErrorUser(false);
            }
          }}
          className="mx-5 mt-5 my-2 px-2 py-1 rounded-md outline-2 outline-brand-dark bg-white text-gray-800"
        />
        {errorPass && (
          <div className="bg-red-950 text-center">
            Password must be between 8 and 20 characters.
          </div>
        )}
        <input
          type="password"
          value={password}
          placeholder="Password"
          onChange={(e) => {
            setPassword(e.target.value);
            setErrorLogin(false);
            if (
              e.target.value !== "" &&
              e.target.value.length >= 8 &&
              e.target.value.length <= 20
            ) {
              setErrorPass(false);
            }
          }}
          className="mx-5 mb-5 my-2 px-2 py-1 rounded-md outline-2 outline-brand-dark bg-white text-gray-800"
        />
        {loading ? (
          <div className="text-black text-center">Loading...</div>
        ) : (
          <button
            type="submit"
            className="py-2 mx-5 my-2 rounded-2xl text-center hover:cursor-pointer outline-2 outline-brand-dark hover:bg-brand bg-brand-light text-white"
          >
            Sign In
          </button>
        )}
      </form>
      {errorLogin && (
        <div className="bg-red-950 text-center">
          Invalid username or password.
        </div>
      )}
      <div className="flex justify-center">
        <p className="py-2 mb-2 text-gray-800">
          You don't have an account?
          <span className="ml-1 hover:cursor-pointer text-brand">
            <Link to={"/SignUp"}>Register here.</Link>
          </span>
        </p>
      </div>
    </div>
  );
};

export default AuthMenu;
