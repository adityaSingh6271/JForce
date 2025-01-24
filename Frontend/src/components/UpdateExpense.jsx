import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./UpdateExpense.css";

const UpdateExpense = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: "",
    amount: "",
    date: "",
    description: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchExpense = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("You are not logged in. Redirecting to login...");
        setTimeout(() => navigate("/login"), 2000);
        return;
      }

      try {
        const response = await fetch(`http://localhost:5000/api/expenses/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setFormData({
            name: data.name,
            amount: data.amount,
            date: data.date ? data.date.split("T")[0] : "",
            description: data.description,
          });
        } else {
          toast.error("Failed to fetch expense data.");
        }
      } catch (error) {
        toast.error("An error occurred while fetching the expense.");
        console.error("Error:", error);
      }
    };

    fetchExpense();
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("You are not logged in. Redirecting to login...");
      setTimeout(() => navigate("/login"), 2000);
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/expenses/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success("Expense updated successfully!");
        setTimeout(() => navigate("/expense-list"), 2000);
      } else {
        toast.error("Failed to update expense.");
      }
    } catch (error) {
      toast.error("An error occurred while updating the expense.");
      console.error("Error:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Logged out successfully!");
    setTimeout(() => navigate("/login"), 2000);
  };

  return (
    <div className="update-expense-container">
      <ToastContainer /> {/* ToastContainer for notifications */}

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

      {/* Update Expense Form */}
      <div className="update-expense-box">
        <h2>Update Expense</h2>
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
            Update Expense
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateExpense;
