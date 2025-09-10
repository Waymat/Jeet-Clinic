import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      window.location.href = "/"; // redirect to prescription page
    } catch (err) {
      setError("Invalid credentials!");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-3">Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          className="form-control mb-2"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          className="form-control mb-2"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="btn btn-danger">
          Login
        </button>
      </form>
      {error && <p className="text-danger mt-2">{error}</p>}
    </div>
  );
}
