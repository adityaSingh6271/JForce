import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./ExpenseTracker.css";

const ExpenseTracker = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Logged out successfully!");
    setTimeout(() => {
      navigate("/login");
    }, 2000);
  };

  return (
    <div className="expense-tracker-container">
      <ToastContainer />
      <div className="expense-tracker-box">
        <h1>Welcome to Expense Tracker</h1>
        <p>
          Track and manage your expenses effectively. Use the navigation links
          to add new expenses or view your expense history.
        </p>
        <div className="expense-tracker-links">
          <Link to="/add-expense" className="expense-link">
            Add Expense
          </Link>
          <Link to="/expense-list" className="expense-link">
            Expense List
          </Link>
        </div>
        <button className="log-out" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default ExpenseTracker;
