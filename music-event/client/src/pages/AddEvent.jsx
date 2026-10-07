import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:5001/api/events";

const initialForm = {
  event_name: "",
  artist: "",
  genre: "",
  venue: "",
  event_date: "",
  status: "Upcoming"
};

export default function AddEvent() {
  const [form, setForm] = useState(initialForm);
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((previous) => ({ ...previous, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setMessage("");

    if (!form.event_name || !form.artist || !form.genre || !form.venue || !form.event_date) {
      setMessage("Please fill in all fields.");
      return;
    }

    try {
      setSaving(true);
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Could not add event.");

      setForm(initialForm);
      navigate("/events");
    } catch (error) {
      setMessage(error.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <section className="form-page">
      <div className="page-heading">
        <div>
          <p className="eyebrow">NEW MUSIC EVENT</p>
          <h1>Add Event</h1>
          <p>Enter the basic details of a music event.</p>
        </div>
      </div>

      <form className="event-form" onSubmit={handleSubmit}>
        <label>Event Name<input name="event_name" value={form.event_name} onChange={handleChange} placeholder="Enter event name" /></label>
        <label>Artist<input name="artist" value={form.artist} onChange={handleChange} placeholder="Enter artist name" /></label>
        <label>Genre<input name="genre" value={form.genre} onChange={handleChange} placeholder="e.g. Pop, Rock, Classical" /></label>
        <label>Venue<input name="venue" value={form.venue} onChange={handleChange} placeholder="Enter venue" /></label>
        <label>Event Date<input type="date" name="event_date" value={form.event_date} onChange={handleChange} /></label>
        <label>Event Status<select name="status" value={form.status} onChange={handleChange}><option>Upcoming</option><option>Completed</option></select></label>

        {message && <p className="form-message">{message}</p>}
        <button className="primary-button" type="submit" disabled={saving}>{saving ? "Saving..." : "Add Event"}</button>
      </form>
    </section>
  );
}
