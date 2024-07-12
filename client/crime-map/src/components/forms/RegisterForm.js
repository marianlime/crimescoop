import React, { useState } from "react";
import register from "../../api/auth/register";
import { Link } from "react-router-dom";

const RegisterForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async (event) => {
    event.preventDefault();
    const response = await register(name, email, password);
    if(response.success) {
      setMessage("Successfully Registered!");
      setName("");
      setEmail("");
      setPassword("");
      return;
    }
    setMessage(response.error);
  };

  return (
    <form onSubmit={handleRegister}>
      {message && <p>{message}</p>}
      <input
        type="text"
        name="name"
        value={name}
        onChange={(event) => setName(event.target.value)}
        placeholder="Enter your name"
        required
      />
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
        minLength={8}
        required
      />
      <p>Already a member? <Link to="/login">Login now</Link></p>
      <button type="submit">Register</button>
    </form>
  );
};

export default RegisterForm;
