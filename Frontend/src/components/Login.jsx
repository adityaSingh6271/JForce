import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "react-toastify/dist/ReactToastify.css";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();

  // Validation Schema with Yup
  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email format").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", values);
      const { token } = response.data;

      localStorage.setItem("token", token);
      toast.success("Login successful! Redirecting to dashboard...");
      setTimeout(() => navigate("/ExpenseTracker"), 2000);
    } catch (error) {
      const errorMsg = error.response?.data?.message || "Login failed. Please try again.";
      toast.error(errorMsg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="login-container">
      <ToastContainer />
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="login-form">
            <h2>Login Page</h2>

            <div className="form-group">
              <label>Email:</label>
              <Field type="email" name="email" />
              <ErrorMessage name="email" component="p" className="error-message" />
            </div>

            <div className="form-group">
              <label>Password:</label>
              <Field type="password" name="password" />
              <ErrorMessage name="password" component="p" className="error-message" />
            </div>

            <button type="submit" className="login-btn" disabled={isSubmitting}>
              {isSubmitting ? "Logging in..." : "Login"}
            </button>
            <p>
              New user? <Link to="/" className="register-link">Register here</Link>
            </p>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
