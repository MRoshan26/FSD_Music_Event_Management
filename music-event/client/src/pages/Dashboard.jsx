import React from "react";
import { useEffect, useState } from "react";

const API_URL = "http://localhost:5001/api/events";

export default function Dashboard() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => setEvents(data))
      .catch(() => setEvents([]));
  }, []);

  const count = (status) =>
    events.filter((event) => event.status === status).length;

  const artistCount = new Set(events.map((event) => event.artist)).size;
  const genreCount = new Set(events.map((event) => event.genre).filter(Boolean)).size;

  return (
    <section>
      <div className="hero">
        <div>
          <p className="eyebrow">MUSIC EVENT & ARTIST MANAGEMENT</p>
          <h1>Keep your music events organized.</h1>
          <p className="hero-text">
            Manage artists, venues and event schedules through one simple dashboard.
          </p>
        </div>
        <div className="hero-music">🎶</div>
      </div>

      <h2 className="section-title">Event Overview</h2>

      <div className="stats-grid">
        <div className="stat-card">
          <span>🎤</span>
          <div><small>Total Artists</small><strong>{artistCount}</strong></div>
        </div>
        <div className="stat-card">
          <span>📅</span>
          <div><small>Upcoming Events</small><strong>{count("Upcoming")}</strong></div>
        </div>
        <div className="stat-card">
          <span>🎧</span>
          <div><small>Genre Count</small><strong>{genreCount}</strong></div>
        </div>
      </div>

      <div className="stats-grid second-stats">
        <div className="stat-card">
          <span>🎼</span>
          <div><small>Total Events</small><strong>{events.length}</strong></div>
        </div>
        <div className="stat-card">
          <span>✅</span>
          <div><small>Completed</small><strong>{count("Completed")}</strong></div>
        </div>
      </div>
    </section>
  );
}
