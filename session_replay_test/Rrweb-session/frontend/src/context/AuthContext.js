
import React, { createContext, useState, useEffect } from 'react';
import api from '../services/api';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // ⬅️ NEW

  useEffect(() => {
    api.getCurrentUser()
      .then(res => {
        setUser(res.data); // ⬅️ NOT res.data.user, just res.data
      })
      .catch(() => {
        setUser(null);
      })
      .finally(() => setLoading(false)); // ⬅️ DONE loading
  }, []);

  function login() {
    api.getCurrentUser()
      .then(res => {
        setUser(res.data);
      })
      .catch(() => {
        setUser(null);
      });
  }

  function logout() {
    setUser(null);
    // Optionally: Call a logout endpoint
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
