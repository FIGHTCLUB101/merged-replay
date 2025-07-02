
import React, { useState, useContext } from 'react';
import api from '../../services/api';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [teamName, setTeamName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleSubmit = async e => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      const res = await api.signup({ email, password, teamName });
      login(res.data.token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Error during signup');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-green-500 flex items-center justify-center p-4">
      <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-xl p-8 w-full max-w-md relative overflow-hidden animate-fade-in-down">
        <div className="absolute top-0 left-0 right-0 h-1 bg-green-600"></div>

        <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">
          Create Account
        </h1>
        <p className="text-center text-gray-600 mb-6">Join the team to get started</p>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email Address</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              disabled={isLoading}
              required
              className="mt-1 w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:border-green-500 focus:outline-none focus:shadow-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              placeholder="Create a password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              disabled={isLoading}
              required
              className="mt-1 w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:border-green-500 focus:outline-none focus:shadow-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Team Name</label>
            <input
              type="text"
              placeholder="Team Alpha"
              value={teamName}
              onChange={e => setTeamName(e.target.value)}
              disabled={isLoading}
              required
              className="mt-1 w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:border-green-500 focus:outline-none focus:shadow-lg"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-green-600 text-white font-semibold py-3 rounded-xl hover:bg-green-700 transition"
          >
            {isLoading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>
      </div>
    </div>
  );
}
