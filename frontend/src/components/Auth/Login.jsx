import React, { useState } from "react";
import API from "../../api";
import { useNavigate, Link } from "react-router-dom";

export default function Login({ setUser }) {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await API.post("/auth/login", formData);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      if (setUser) setUser(res.data.user);
      alert("Login Successful!");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Login failed. Please check credentials.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-4">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-5">
          <div className="glass-card p-4 p-sm-5">
            <div className="text-center mb-4">
              <div className="fs-1 text-primary mb-2">
                <i className="bi bi-shield-lock-fill"></i>
              </div>
              <h2 className="fw-bold text-dark">Portal Login</h2>
              <p className="text-muted small">
                Sign in to your university account
              </p>
            </div>

            {error && (
              <div
                className="alert alert-danger py-2 text-center rounded-3 border-0 small"
                role="alert"
              >
                <i className="bi bi-exclamation-triangle-fill me-1"></i> {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label text-secondary small fw-semibold">
                  Email Address
                </label>
                <div className="input-group">
                  <span className="input-group-text bg-light border-end-0 text-muted">
                    <i className="bi bi-envelope"></i>
                  </span>
                  <input
                    type="email"
                    className="form-control border-start-0 bg-light py-2"
                    placeholder="student@univ.ac.lk"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="form-label text-secondary small fw-semibold">
                  Password
                </label>
                <div className="input-group">
                  <span className="input-group-text bg-light border-end-0 text-muted">
                    <i className="bi bi-key"></i>
                  </span>
                  <input
                    type="password"
                    className="form-control border-start-0 bg-light py-2"
                    placeholder="••••••••"
                    required
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary w-100 py-2.5 rounded-3 fw-bold text-uppercase shadow-sm"
              >
                {loading ? "Authenticating..." : "Sign In"}
              </button>
            </form>

            <hr className="my-4 text-muted opacity-25" />

            <div className="text-center">
              <p className="text-muted small mb-0">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="text-primary fw-bold text-decoration-none"
                >
                  Register Here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
