import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

const useLogin = () => {
  const { dispatch } = useAuthContext();
  const [error, setError] = useState(null);
  const [isloading, setIsloading] = useState(false);
  const login = async (email, password) => {
    setIsloading(true);
    setError(null)
    const res = await fetch("http://localhost:4000/api/user/login", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const json = await res.json();
    if (!res.ok) {
      setError(json.error);
      setIsloading(false);
    } else {
      //save the JWT in localstorage
      localStorage.setItem("user", JSON.stringify(json));
      setIsloading(false);
      

      //changing the global state using dispach
      dispatch({ type: "LOGIN", payload: json });
    }
  };
  return { login, isloading, error };
};

export default useLogin;
