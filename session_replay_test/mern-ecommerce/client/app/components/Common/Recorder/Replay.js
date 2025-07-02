import React from "react";
import { useEffect, useRef } from "react";
import "rrweb-player/dist/style.css";
import Player from "rrweb-player";

const Replay = () => {
  const playerRef = useRef(null);

  useEffect(() => {
    // Get events from localStorage (or fetch from backend)
    const events = JSON.parse(localStorage.getItem("rrweb-events") || "[]");

    if (playerRef.current && events.length > 0) {
      // Clear previous player if any
      playerRef.current.innerHTML = "";
      // eslint-disable-next-line no-new
      new Player({
        target: playerRef.current,
        props: {
          events,
        },
      });
    }
  }, []);

  return (
    <div>
      <h2>Session Replay</h2>
      <div ref={playerRef} />
    </div>
  );
};

export default Replay;