
import React, { useEffect, useState, useContext } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function Dashboard() {
  const [sessions, setSessions] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [darkMode, setDarkMode] = useState(false);
  const sessionsPerPage = 5;

  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  useEffect(() => {
    fetchSessions();
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  async function fetchSessions() {
    try {
      const res = await api.getSessions();
      setSessions(res.data.sessions);
    } catch (err) {
      console.error(err);
      if (err.response?.status === 401) logout();
    }
  }

  const filteredSessions = sessions.filter(s =>
    s._id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (s.tags || []).some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const totalPages = Math.ceil(filteredSessions.length / sessionsPerPage);
  const currentSessions = filteredSessions.slice(
    (currentPage - 1) * sessionsPerPage,
    currentPage * sessionsPerPage
  );

  return (
    <div className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-700 text-white p-6 space-y-6 hidden md:block">
        <h2 className="text-2xl font-bold">Dashboard</h2>
        <nav className="space-y-2">
          <button onClick={() => navigate('/dashboard')} className="block w-full text-left hover:bg-blue-600 px-3 py-2 rounded">Home</button>
          <button onClick={() => navigate('/record')} className="block w-full text-left hover:bg-blue-600 px-3 py-2 rounded">Start Recording</button>
          <button onClick={logout} className="block w-full text-left hover:bg-blue-600 px-3 py-2 rounded">Logout</button>
        </nav>
        <div>
          <label className="inline-flex items-center">
            <input type="checkbox" checked={darkMode} onChange={() => setDarkMode(!darkMode)} className="mr-2" />
            Dark Mode
          </label>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <div className="flex flex-col md:flex-row justify-between items-center mb-4">
          <h1 className="text-2xl font-bold mb-4 md:mb-0">Session History</h1>
          <input
            type="text"
            placeholder="Search sessions..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="px-4 py-2 border rounded-md w-full md:w-64 bg-white dark:bg-gray-700 dark:text-white dark:border-gray-600"
          />
        </div>

        <div className="bg-white dark:bg-gray-800 rounded shadow overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-100 dark:bg-gray-700 text-left">
              <tr>
                <th className="px-4 py-2">ID</th>
                <th className="px-4 py-2">Start</th>
                <th className="px-4 py-2">End</th>
                <th className="px-4 py-2">Tags</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentSessions.map(s => (
                <tr key={s._id} className="border-t dark:border-gray-700">
                  <td className="px-4 py-2 break-all">{s._id}</td>
                  <td className="px-4 py-2">{new Date(s.startTime).toLocaleString()}</td>
                  <td className="px-4 py-2">{s.endTime ? new Date(s.endTime).toLocaleString() : 'In Progress'}</td>
                  <td className="px-4 py-2">{(s.tags || []).join(', ')}</td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => navigate(`/replay/${s._id}`)}
                      className="text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      Replay
                    </button>
                  </td>
                </tr>
              ))}
              {currentSessions.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center px-4 py-6 text-gray-500 dark:text-gray-400">
                    No sessions found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="mt-4 flex justify-center space-x-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 rounded ${
                currentPage === i + 1
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </main>
    </div>
  );
}
