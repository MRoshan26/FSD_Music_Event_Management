import React, { useEffect, useState } from "react";

const API_URL = "http://localhost:5001/api/events";

export default function Events() {
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
    `${event.event_name} ${event.artist} ${event.venue} ${event.genre || ""}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <section>
      <div className="page-heading">
        <div>
          <p className="eyebrow">EVENT MANAGEMENT</p>
          <h1>Events</h1>
          <p>View all music events, artists, venues, dates and statuses.</p>
        </div>

        <input
          className="search-box"
          type="search"
          placeholder="Search events..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
      </div>

      {loading ? (
        <p className="empty-state">Loading events...</p>
      ) : filteredEvents.length === 0 ? (
        <p className="empty-state">No events found. Add an event to get started.</p>
      ) : (
        <div className="table-card">
          <div className="event-table-wrap">
            <table className="event-table">
              <thead>
                <tr>
                  <th>Event</th>
                  <th>Artist</th>
                  <th>Genre</th>
                  <th>Venue</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredEvents.map((event) => (
                  <tr key={event.id}>
                    <td><strong>{event.event_name}</strong></td>
                    <td>{event.artist}</td>
                    <td>{event.genre || "—"}</td>
                    <td>{event.venue}</td>
                    <td>{new Date(event.event_date).toLocaleDateString("en-IN")}</td>
                    <td>
                      <span className={`status ${event.status.toLowerCase().replaceAll(" ", "-")}`}>
                        {event.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </section>
  );
}
