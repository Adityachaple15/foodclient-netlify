import React, { useContext, useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../service/authService";
import { StoreContext } from "../../context/StoreContext";
import { toast } from "react-toastify";

const Login = () => {
  const { setToken, loadCartData } = useContext(StoreContext);
  const navigate = useNavigate();

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const emailRegex = /^\S+@\S+\.\S+$/;

  // 🔹 Validate inputs
  const validate = () => {
    const newErrors = {};

    if (!data.email) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(data.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!data.password) {
      newErrors.password = "Password is required";
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
      const response = await login(data);

      if (response.status === 200) {
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);

        await loadCartData(response.data.token);

        toast.success("Login successful");
        navigate("/");
      }
    } catch (error) {
      if (error.response?.status === 401) {
        toast.error("Invalid email or password");
      } else {
        toast.error("Unable to login. Please try again");
      }
    }
  };

  return (
    <div className="login-container">
      <div className="row w-100">
        <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
          <div className="card border-0 shadow rounded-3 my-5">
            <div className="card-body p-4 p-sm-5">
              <h5 className="card-title text-center mb-5 fw-light fs-5">
                Sign In
              </h5>

              <form onSubmit={onSubmitHandler} noValidate>
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
                  <label htmlFor="floatingInput">Email address</label>
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
                    Sign in
                  </button>

                  <button
                    className="btn btn-outline-danger btn-login text-uppercase mt-2"
                    type="reset"
                    onClick={() => {
                      setData({ email: "", password: "" });
                      setErrors({});
                    }}
                  >
                    Reset
                  </button>
                </div>

                <div className="mt-4 text-center">
                  Don't have an account? <Link to="/register">Sign up</Link>
                </div>
              </form>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
