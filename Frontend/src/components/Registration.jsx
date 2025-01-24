import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "react-toastify/dist/ReactToastify.css";
import "./Registration.css";

const Registration = () => {
  const navigate = useNavigate();

  // Validation Schema with Yup
  const validationSchema = Yup.object({
    username: Yup.string().required("Username is required"),
    fullName: Yup.string().required("Full Name is required"),
    email: Yup.string().email("Invalid email format").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const handleSubmit = async (values) => {
    const userData = {
      username: values.username.toLowerCase(),
      name: values.fullName,
      email: values.email.toLowerCase(),
      password: values.password,
    };

    try {
      await axios.post("http://localhost:5000/api/auth/register", userData);
      toast.success("Registration successful!");
      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed.");
    }
  };

  return (
    <div className="registration-container">
      <ToastContainer />
      <Formik
        initialValues={{
          username: "",
          fullName: "",
          email: "",
          password: "",
          confirmPassword: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="registration-form">
            <h2>Registration</h2>

            <div className="form-group">
              <label>Username:</label>
              <Field type="text" name="username" />
              <ErrorMessage name="username" component="p" className="error-message" />
            </div>

            <div className="form-group">
              <label>Full Name:</label>
              <Field type="text" name="fullName" />
              <ErrorMessage name="fullName" component="p" className="error-message" />
            </div>

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

            <div className="form-group">
              <label>Confirm Password:</label>
              <Field type="password" name="confirmPassword" />
              <ErrorMessage
                name="confirmPassword"
                component="p"
                className="error-message"
              />
            </div>

            <button type="submit" className="register-btn" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Register"}
            </button>
            <p>
              Already have an account? <Link to="/login" className="login-link">Login here</Link>
            </p>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Registration;
