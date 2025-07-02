
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import rrwebPlayer from 'rrweb-player';
import 'rrweb-player/dist/style.css';

export default function ReplayViewer() {
  const { sessionId } = useParams();
  const [session, setSession] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchSession();
  }, []);

  async function fetchSession() {
    try {
      console.log('Fetching session:', sessionId);
      const res = await api.get(`/sessions/${sessionId}`);
      const data = res.data.session;

      if (!data || !Array.isArray(data.events) || data.events.length === 0) {
        throw new Error('No valid session or events found.');
      }

      // Sort events by timestamp just in case
      const sortedEvents = data.events.sort((a, b) => a.timestamp - b.timestamp);

      setSession(data);

      const container = document.getElementById('replayContainer');
      if (container) {
        container.innerHTML = ''; // clear previous replay
        setTimeout(() => {
          try {
            new rrwebPlayer({
              target: container,
              props: {
                events: sortedEvents,
                showController: true,
              },
            });
          } catch (err) {
            console.error('Error initializing rrwebPlayer:', err);
          }
        }, 300);
      } else {
        console.error('Replay container not found.');
      }

    } catch (err) {
      console.error('Error loading session replay:', err);

      if (err.response?.status === 403) alert('Forbidden');
      if (err.response?.status === 404) alert('Session not found');
      
      // Optional: re-enable this after debugging
      // navigate('/dashboard');
    }
  }

  if (!session) return <div>Loading...</div>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Replay Session: {sessionId}</h2>
      <div id="replayContainer" style={{ width: '100%', height: '600px' }} className="mb-6 border rounded" />

      <div className="bg-gray-100 p-4 rounded shadow">
        <h3 className="text-lg font-semibold mb-2">Tags & Notes</h3>
        <form
          onSubmit={async e => {
            e.preventDefault();
            const tagsInput = e.target.tags.value;
            const notesInput = e.target.notes.value;
            const tags = tagsInput.split(',').map(t => t.trim()).filter(t => t);
            try {
              await api.put(`/sessions/${sessionId}`, { tags, notes: notesInput });
              alert('Updated');
            } catch (err) {
              console.error(err);
              alert('Error updating');
            }
          }}
        >
          <input
            name="tags"
            defaultValue={(session.tags || []).join(', ')}
            placeholder="Comma-separated tags"
            className="w-full p-2 border mb-2 rounded"
          />
          <textarea
            name="notes"
            defaultValue={session.notes || ''}
            placeholder="Notes"
            className="w-full p-2 border mb-2 rounded"
          />
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Save
          </button>
        </form>
      </div>
    </div>
  );
}
