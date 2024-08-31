import { useState } from "react";
import useSignup from "../hooks/useSignup";








const Signup = () => {
  const { signup, isLoading, error } = useSignup();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(email, password);
  };

  return (
    <form className="signup" onSubmit={handleSubmit} noValidate>
      <h3>Sign Up</h3>

      <label>Email address:</label>
      <input
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <label>Password:</label>
      <input
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />

      {!isLoading && <button>Sign up</button>}
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default Signup;
