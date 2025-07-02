import React, { useEffect, useState } from "react";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

const SessionList = () => {
  const { token } = useAuth();
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const res = await api.get("/sessions");
        setSessions(res.data);
      } catch (err) {
        setError("Failed to load sessions.");
      } finally {
        setLoading(false);
      }
    };

    fetchSessions();
  }, [token]);

  if (loading) return <p>Loading sessions...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Your Team's Sessions</h2>
      {sessions.length === 0 ? (
        <p>No sessions found.</p>
      ) : (
        <ul className="space-y-4">
          {sessions.map((session) => (
            <li key={session._id} className="border p-4 rounded-lg shadow">
              <p className="text-sm text-gray-600">
                <strong>Started:</strong>{" "}
                {new Date(session.startTime).toLocaleString()}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Ended:</strong>{" "}
                {new Date(session.endTime).toLocaleString()}
              </p>
              {session.tags?.length > 0 && (
                <p className="text-sm text-blue-600">
                  <strong>Tags:</strong> {session.tags.join(", ")}
                </p>
              )}
              {session.notes && (
                <p className="text-sm italic text-gray-500">
                  <strong>Note:</strong> {session.notes}
                </p>
              )}
              <Link
                to={`/replay/${session._id}`}
                className="inline-block mt-2 text-blue-500 hover:underline"
              >
                View Replay
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SessionList;
