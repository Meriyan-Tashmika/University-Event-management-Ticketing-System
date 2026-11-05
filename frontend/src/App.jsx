import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";

export default function App() {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem("user");
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  });

  return (
    <Router>
      <div className="min-vh-100 d-flex flex-column">
        {/* Modern Header Nav */}
        <header className="glass-nav py-3 sticky-top">
          <div className="container d-flex flex-column flex-md-row align-items-center justify-content-between gap-3">
            <div className="d-flex align-items-center gap-3 text-center text-md-start">
              <span className="fs-2">🎓</span>
              <div>
                <h1 className="fs-4 mb-0 fw-bold brand-gradient">
                  UniEvents
                </h1>
                <small className="text-white-50">
                  Campus Events & Ticketing Portal
                </small>
              </div>
            </div>

            <nav className="d-flex gap-2">
              <Link
                to="/login"
                className="btn btn-outline-info rounded-pill px-4 fw-semibold"
              >
                <i className="bi bi-box-arrow-in-right me-1"></i> Login
              </Link>
              <Link
                to="/register"
                className="btn btn-primary rounded-pill px-4 fw-semibold"
              >
                <i className="bi bi-person-plus me-1"></i> Register
              </Link>
            </nav>
          </div>
        </header>

        {/* Dynamic Form Area */}
        <main className="flex-grow-1 d-flex align-items-center justify-content-center p-3">
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login setUser={setUser} />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
