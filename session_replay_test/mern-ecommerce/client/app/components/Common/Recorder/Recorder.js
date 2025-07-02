import { useEffect, useRef, useState } from "react";
import * as rrweb from "rrweb";
import axios from "axios";
import React from "react";


const RRWEB_BACKEND_URL = "http://localhost:5000/api/sessions"; // Adjust as needed

const Recorder = () => {
  const sessionIdRef = useRef(null);
  const eventsRef = useRef([]);
  const stopFnRef = useRef(null);
  const [recording, setRecording] = useState(true);
  const clickCountRef = useRef(0);

  useEffect(() => {
    const token = localStorage.getItem("rrweb_jwt"); // Your JWT

    // 1. Create a new session
    const createSession = async () => {
      try {
        const res = await axios.post(
          RRWEB_BACKEND_URL + "/",
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        );
        sessionIdRef.current = res.data.sessionId;
        localStorage.setItem("rrweb_jwt", token);
      } catch (err) {
        console.error("Failed to create session", err);
      }
    };

    createSession();

    // 2. Start recording
    stopFnRef.current = rrweb.record({
      emit(event) {
        eventsRef.current.push(event);
      },
    });

    // 3. On unload, upload events
    const uploadEvents = async () => {
      if (
        sessionIdRef.current &&
        eventsRef.current.length > 0 &&
        token
      ) {
        try {
          await axios.post(
            `${RRWEB_BACKEND_URL}/${sessionIdRef.current}/chunks`,
            { events: eventsRef.current },
            { headers: { Authorization: `Bearer ${token}` } }
          );
          eventsRef.current = [];
        } catch (err) {
          console.error("Failed to upload events", err);
        }
      }
    };

    window.addEventListener("beforeunload", () => {
      if (
        sessionIdRef.current &&
        eventsRef.current.length > 0 &&
        token
      ) {
        const url = `${RRWEB_BACKEND_URL}/${sessionIdRef.current}/chunks`;
        const data = JSON.stringify({ events: eventsRef.current });
        navigator.sendBeacon(url, data);
      }
    });

    // Click event handler
    const handleClick = () => {
      clickCountRef.current += 1;
      if (clickCountRef.current >= 10 && recording) {
        handleStopRecording();
      }
    };

    // Add click event listener
    window.addEventListener("click", handleClick);

    return () => {
      if (stopFnRef.current) stopFnRef.current();
      uploadEvents();
      window.removeEventListener("beforeunload", uploadEvents);
      window.removeEventListener("click", handleClick);
    };
  }, []);

  const handleStopRecording = async () => {
    setRecording(false);
    if (stopFnRef.current) stopFnRef.current();
    const token = localStorage.getItem("rrweb_jwt");
    if (
      sessionIdRef.current &&
      eventsRef.current.length > 0 &&
      token
    ) {
      try {
        await axios.post(
          `${RRWEB_BACKEND_URL}/${sessionIdRef.current}/chunks`,
          { events: eventsRef.current },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        eventsRef.current = [];
      } catch (err) {
        console.error("Failed to upload events", err);
      }
    }
  };

  return recording ? (
    <button
      style={{ position: "fixed", bottom: 20, right: 20, zIndex: 9999 }}
      onClick={handleStopRecording}
    >
      Stop Recording
    </button>
  ) : null;
};

export default Recorder;