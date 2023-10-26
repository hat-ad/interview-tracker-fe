import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../../slice/auth.slice";
import { postServiceWithToken } from "../../../../services";
import { toast } from "react-toastify";
import { Errors } from "../../../../utils/interface";

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState<Errors>({ email: "", password: "" });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const { email, password } = formData;
    const emailError = !email.match(/^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/)
      ? "Invalid email address"
      : "";
    const passwordError =
      password.length < 6 ? "Password must be at least 6 characters" : "";

    setErrors({ email: emailError, password: passwordError });

    return !emailError && !passwordError;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const { email, password } = formData;
        const payload: Record<string, unknown> = { email, password };
        const { status, data, message } = await postServiceWithToken(
          "user/login",
          payload
        );
        if (status) {
          dispatch(loginUser(data));
        } else {
          toast.error(message);
        }
      } catch (error) {
        console.error("Error during login:", error);
        toast.error("An error occurred during login.");
      }
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-header">Login Form</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label className="login-label">Email:</label>
          <input
            className="login-input"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
          <div className="login-error">{errors.email}</div>
        </div>

        <div>
          <label className="login-label">Password:</label>
          <input
            className="login-input"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
          <div className="login-error">{errors.password}</div>
        </div>

        <button type="submit" className="login-button">
          Login
        </button>
      </form>
      <p>
        Don't have an account? <Link to="/register">Create Account</Link>
      </p>
    </div>
  );
};

export default Login;
