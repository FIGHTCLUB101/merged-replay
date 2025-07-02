import { useEffect, useRef, useCallback, useState } from 'react';
import * as rrweb from 'rrweb';
import axios from 'axios';

const DEFAULT_BACKEND_URL = 'http://localhost:5000/api/sessions';

export const useRrwebRecorder = ({
  backendUrl = DEFAULT_BACKEND_URL,
  getToken = () => localStorage.getItem('rrweb_jwt'),
  autoUpload = true,
} = {}) => {
  const sessionIdRef = useRef(null);
  const eventsRef = useRef([]);
  const stopFnRef = useRef(null);
  const [recording, setRecording] = useState(false);

  const createSession = useCallback(async () => {
    const token = getToken();
    if (!token) throw new Error('No JWT token available');
    const res = await axios.post(
      `${backendUrl}/`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );
    sessionIdRef.current = res.data.sessionId;
  }, [backendUrl, getToken]);

  const uploadEvents = useCallback(async () => {
    const token = getToken();
    if (!sessionIdRef.current || eventsRef.current.length === 0 || !token) return;
    await axios.post(
      `${backendUrl}/${sessionIdRef.current}/chunks`,
      { events: eventsRef.current },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    eventsRef.current = [];
  }, [backendUrl, getToken]);

  const startRecording = useCallback(async () => {
    if (recording) return;
    await createSession();
    stopFnRef.current = rrweb.record({
      emit(event) {
        eventsRef.current.push(event);
      },
    });
    setRecording(true);
  }, [createSession, recording]);

  const stopRecording = useCallback(async () => {
    if (!recording) return;
    if (stopFnRef.current) stopFnRef.current();
    if (autoUpload) await uploadEvents();
    setRecording(false);
  }, [recording, autoUpload, uploadEvents]);

  useEffect(() => {
    const handleUnload = () => {
      if (sessionIdRef.current && eventsRef.current.length > 0) {
        const url = `${backendUrl}/${sessionIdRef.current}/chunks`;
        const payload = JSON.stringify({ events: eventsRef.current });
        navigator.sendBeacon(url, payload);
      }
    };

    window.addEventListener('beforeunload', handleUnload);
    return () => {
      window.removeEventListener('beforeunload', handleUnload);
      stopRecording();
    };
  }, [backendUrl, stopRecording]);

  return { recording, startRecording, stopRecording };
};

/*
 * src/components/Recorder/Recorder.js
 * A component that provides Start and Stop buttons for session recording.
 */
import React from 'react';
import { useRrwebRecorder } from '../../hooks/useRrwebRecorder';

const Recorder = () => {
  const { recording, startRecording, stopRecording } = useRrwebRecorder();

  return (
    <div style={{ position: 'fixed', bottom: 20, right: 20, zIndex: 9999 }}>
      {!recording ? (
        <button onClick={startRecording} style={{ marginRight: 8 }}>
          Start Recording
        </button>
      ) : (
        <button onClick={stopRecording}>
          Stop Recording
        </button>
      )}
    </div>
  );
};

export default Recorder;
