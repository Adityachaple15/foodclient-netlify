import React, { useState } from "react";
import "./Register.css";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { registerUser } from "../../service/authService";

const Register = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  // 🔹 Regex
  const emailRegex = /^\S+@\S+\.\S+$/;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

  const validate = () => {
    const newErrors = {};

    if (!data.name.trim()) {
      newErrors.name = "Full name is required";
    } else if (data.name.length < 3) {
      newErrors.name = "Name must be at least 3 characters";
    }

    if (!data.email) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(data.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!data.password) {
      newErrors.password = "Password is required";
    } else if (!passwordRegex.test(data.password)) {
      newErrors.password =
        "Password must be at least 8 characters, include uppercase, lowercase & number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prev) => ({ ...prev, [name]: value }));

    // clear error while typing
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (!validate()) return;

    try {
      const response = await registerUser(data);

      if (response.status === 201) {
        toast.success("Registration completed. Please login.");
        navigate("/login");
      }
    } catch (error) {
      if (error.response?.data) {
        // backend validation message
        toast.error(error.response.data.message || "Registration failed");
      } else {
        toast.error("Unable to register. Please try again");
      }
    }
  };

  return (
    <div className="register-container">
      <div className="row w-100">
        <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
          <div className="card border-0 shadow rounded-3 my-5">
            <div className="card-body p-4 p-sm-5">
              <h5 className="card-title text-center mb-5 fw-light fs-5">
                Sign Up
              </h5>

              <form onSubmit={onSubmitHandler} noValidate>
                {/* Name */}
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className={`form-control ${errors.name ? "is-invalid" : ""}`}
                    id="floatingName"
                    placeholder="John Doe"
                    name="name"
                    value={data.name}
                    onChange={onChangeHandler}
                  />
                  <label htmlFor="floatingName">Full Name</label>
                  {errors.name && (
                    <div className="invalid-feedback">{errors.name}</div>
                  )}
                </div>

                {/* Email */}
                <div className="form-floating mb-3">
                  <input
                    type="email"
                    className={`form-control ${errors.email ? "is-invalid" : ""}`}
                    id="floatingInput"
                    placeholder="name@example.com"
                    name="email"
                    value={data.email}
                    onChange={onChangeHandler}
                  />
                  <label htmlFor="floatingInput">Email</label>
                  {errors.email && (
                    <div className="invalid-feedback">{errors.email}</div>
                  )}
                </div>

                {/* Password */}
                <div className="form-floating mb-3">
                  <input
                    type="password"
                    className={`form-control ${
                      errors.password ? "is-invalid" : ""
                    }`}
                    id="floatingPassword"
                    placeholder="Password"
                    name="password"
                    value={data.password}
                    onChange={onChangeHandler}
                  />
                  <label htmlFor="floatingPassword">Password</label>
                  {errors.password && (
                    <div className="invalid-feedback">{errors.password}</div>
                  )}
                </div>

                <div className="d-grid">
                  <button
                    className="btn btn-outline-primary btn-login text-uppercase"
                    type="submit"
                  >
                    Sign up
                  </button>

                  <button
                    className="btn btn-outline-danger btn-login text-uppercase mt-2"
                    type="reset"
                    onClick={() => {
                      setData({ name: "", email: "", password: "" });
                      setErrors({});
                    }}
                  >
                    Reset
                  </button>
                </div>

                <div className="mt-4 text-center">
                  Already have an account? <Link to="/login">Sign In</Link>
                </div>
              </form>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
