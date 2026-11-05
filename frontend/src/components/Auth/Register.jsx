import React, { useState } from "react";
import API from "../../api";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "Student",
    faculty: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await API.post("/auth/register", formData);
      alert("Registration successful! Please login.");
      navigate("/login");
    } catch (err) {
      setError(
        err.response?.data?.error ||
          err.response?.data?.message ||
          "Registration failed.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-4">
      <div className="row justify-content-center">
        <div className="col-12 col-md-10 col-lg-6">
          <div className="glass-card p-4 p-sm-5">
            <div className="text-center mb-4">
              <div className="fs-1 text-success mb-2">
                <i className="bi bi-person-badge-fill"></i>
              </div>
              <h2 className="fw-bold text-dark">Create Account</h2>
              <p className="text-muted small">
                Register for the UniEvents platform
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
              <div className="row">
                <div className="col-12 mb-3">
                  <label className="form-label text-secondary small fw-semibold">
                    Full Name
                  </label>
                  <input
                    type="text"
                    className="form-control bg-light py-2"
                    placeholder="e.g. Meriyan Tashmika"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                </div>

                <div className="col-12 mb-3">
                  <label className="form-label text-secondary small fw-semibold">
                    University Email
                  </label>
                  <input
                    type="email"
                    className="form-control bg-light py-2"
                    placeholder="student@univ.ac.lk"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label text-secondary small fw-semibold">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control bg-light py-2"
                    placeholder="••••••••"
                    required
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label text-secondary small fw-semibold">
                    User Role
                  </label>
                  <select
                    className="form-select bg-light py-2"
                    value={formData.role}
                    onChange={(e) =>
                      setFormData({ ...formData, role: e.target.value })
                    }
                  >
                    <option value="Student">Student</option>
                    <option value="Club Admin">Club Admin</option>
                    <option value="Super Admin">Super Admin</option>
                  </select>
                </div>

                <div className="col-12 mb-4">
                  <label className="form-label text-secondary small fw-semibold">
                    Faculty / Department
                  </label>
                  <input
                    type="text"
                    className="form-control bg-light py-2"
                    placeholder="e.g. Faculty of Technology"
                    value={formData.faculty}
                    onChange={(e) =>
                      setFormData({ ...formData, faculty: e.target.value })
                    }
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn btn-success w-100 py-2.5 rounded-3 fw-bold text-uppercase shadow-sm"
              >
                {loading ? "Creating Account..." : "Register Now"}
              </button>
            </form>

            <hr className="my-4 text-muted opacity-25" />

            <div className="text-center">
              <p className="text-muted small mb-0">
                Already registered?{" "}
                <Link
                  to="/login"
                  className="text-success fw-bold text-decoration-none"
                >
                  Back to Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
