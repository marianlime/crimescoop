import React, { useState } from "react";
import login from "../../api/auth/login";
import { Link } from "react-router-dom";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();
    const response = await login(email, password);
    if(response) {
      setMessage(response.error);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      {message && <p>{message}</p>}
      <input
        type="email"
        name="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        placeholder="Enter your email"
        required
      />
      <input
        type="password"
        name="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        placeholder="Enter your password"
        required
      />
      <p>
        Not a member? <Link to="/register">Register now</Link>
      </p>
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
