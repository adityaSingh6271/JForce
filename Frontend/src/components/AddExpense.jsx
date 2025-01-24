import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./AddExpense.css";

const AddExpense = () => {
  const [formData, setFormData] = useState({
    name: "",
    amount: "",
    date: "",
    description: "",
  });

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Logged out successfully!");
    setTimeout(() => navigate("/login"), 2000); // Redirect after showing toast
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    if (!token) {
      console.error("No token found in localStorage. Please log in.");
      toast.error("You are not logged in. Redirecting to login page...");
      setTimeout(() => navigate("/login"), 2000); // Redirect after 2 seconds
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/expenses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success("Expense added successfully!");
        setFormData({
          name: "",
          amount: "",
          date: "",
          description: "",
        });
      } else {
        toast.error("Failed to add expense. Please try again.");
      }
    } catch (error) {
      toast.error("Error occurred while adding expense.");
      console.error("Error:", error);
    }
  };

  return (
    <div className="add-expense-container">
      <ToastContainer /> {/* Add ToastContainer */}

      {/* Navbar Section */}
      <nav className="navbar">
        <ul className="nav-links">
          <li>
            <Link to="/ExpenseTracker" className="nav-link">Home</Link>
          </li>
          <li>
            <Link to="/expense-list" className="nav-link">Expense List</Link>
          </li>
          <li>
            <button onClick={handleLogout} className="logout-button">
              Logout
            </button>
          </li>
        </ul>
      </nav>

      {/* Add Expense Form */}
      <div className="add-expense-box">
        <h2>Add New Expense</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Expense Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Amount:</label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Date:</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Description:</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              required
            ></textarea>
          </div>
          <button type="submit" className="submit-button">
            Add Expense
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddExpense;
