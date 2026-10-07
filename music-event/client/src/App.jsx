import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Artists from "./pages/Artists";
import Events from "./pages/Events";
import AddEvent from "./pages/AddEvent";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <main className="error-page">
          <h1>Something went wrong.</h1>
          <p>Please refresh the page and try again.</p>
        </main>
      );
    }

    return this.props.children;
  }
}

export default function App() {
  return (
    <ErrorBoundary>
      <Navbar />
      <main className="page-container">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/artists" element={<Artists />} />
          <Route path="/events" element={<Events />} />
          <Route path="/add-event" element={<AddEvent />} />
        </Routes>
      </main>
    </ErrorBoundary>
  );
}
