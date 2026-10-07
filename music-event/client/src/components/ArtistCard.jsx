import React from "react";
export default function ArtistCard({ event }) {
  return (
    <article className="artist-card">
      <div className="artist-top">
        <span className="artist-icon">🎤</span>
        <span className={`status ${event.status.toLowerCase().replaceAll(" ", "-")}`}>
          {event.status}
        </span>
      </div>

      <h3>{event.artist}</h3>

      <p>
        <strong>Event:</strong> {event.event_name}
      </p>
      <p>
        <strong>Venue:</strong> {event.venue}
      </p>
      <p>
        <strong>Date:</strong>{" "}
        {new Date(event.event_date).toLocaleDateString("en-IN")}
      </p>
    </article>
  );
}
