import React, { useState } from "react";
import axios from "axios";

const RRWEB_BACKEND_URL = "http://localhost:5000/api/auth/login"; // Change if needed

const RrwebLogin = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      const res = await axios.post(RRWEB_BACKEND_URL, { email, password });
      localStorage.setItem("rrweb_jwt", res.data.token);
      console.log(res.data.token);
      setMessage("Login successful! JWT stored.");
      if (onLogin) onLogin();
    } catch (err) {
      setMessage("Login failed: " + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "2rem auto", padding: 20, border: "1px solid #ccc" }}>
      <h3>Login to Rrweb-session backend</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            style={{ width: "100%" }}
          />
        </div>
        <div style={{ marginTop: 10 }}>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            style={{ width: "100%" }}
          />
        </div>
        <button type="submit" style={{ marginTop: 15 }}>Login</button>
      </form>
      {message && <div style={{ marginTop: 10 }}>{message}</div>}
    </div>
  );
};

export default RrwebLogin;
