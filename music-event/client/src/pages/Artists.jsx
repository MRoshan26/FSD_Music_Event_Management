import React from "react";
import { useEffect, useState } from "react";
import ArtistCard from "../components/ArtistCard";

const API_URL = "http://localhost:5001/api/events";

export default function Artists() {
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => setEvents(data))
      .catch(() => setEvents([]))
      .finally(() => setLoading(false));
  }, []);

  const filteredEvents = events.filter((event) =>
    `${event.artist} ${event.event_name} ${event.venue}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <section>
      <div className="page-heading">
        <div>
          <p className="eyebrow">ARTIST & EVENT LIST</p>
          <h1>Artists</h1>
          <p>View artists and the events connected to them.</p>
        </div>

        <input
          className="search-box"
          type="search"
          placeholder="Search artists..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
      </div>

      {loading ? (
        <p className="empty-state">Loading events...</p>
      ) : filteredEvents.length === 0 ? (
        <p className="empty-state">
          No artists found. Add an event to get started.
        </p>
      ) : (
        <div className="artist-grid">
          {filteredEvents.map((event) => (
            <ArtistCard key={event.id} event={event} />
          ))}
        </div>
      )}
    </section>
  );
}
