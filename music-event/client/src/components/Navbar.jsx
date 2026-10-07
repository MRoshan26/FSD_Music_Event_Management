import React from "react";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="brand">
        <span className="brand-icon">🎵</span>
        <span>Music Events</span>
      </div>

      <nav>
        <NavLink to="/">Dashboard</NavLink>
        <NavLink to="/artists">Artists</NavLink>
        <NavLink to="/events">Events</NavLink>
        <NavLink to="/add-event">Add Event</NavLink>
      </nav>
    </header>
  );
}