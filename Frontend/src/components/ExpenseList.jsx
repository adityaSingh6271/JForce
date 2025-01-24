import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./ExpenseList.css";

const ExpenseList = () => {
  const [expenses, setExpenses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const token = localStorage.getItem("token"); // Get token from localStorage

        const response = await fetch("http://localhost:5000/api/expenses", {
          headers: {
            Authorization: `Bearer ${token}`, // Include token in the request header
          },
        });

        if (response.ok) {
          const data = await response.json();
          setExpenses(data);
        } else {
          console.error("Failed to fetch expenses");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchExpenses();
  }, []);

  const handleUpdate = (id) => {
    navigate(`/update-expense/${id}`);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Logged out successfully!");
    setTimeout(() => {
      navigate("/login");
    }, 2000); // Redirect to login after 2 seconds
  };

  return (
    <div className="expense-list-container">
      {/* ToastContainer for notifications */}
      <ToastContainer />

      {/* Navbar Section */}
      <nav className="navbar">
        <ul className="nav-links">
          <li>
            <Link to="/ExpenseTracker" className="nav-link">
              Home
            </Link>
          </li>
          <li>
            <Link to="/add-expense" className="nav-link">
              Add Expense
            </Link>
          </li>
          <li>
            <button onClick={handleLogout} className="logout-button">
              Logout
            </button>
          </li>
        </ul>
      </nav>

      {/* Expense List Section */}
      <div className="expense-list-box">
        <h2>Expense List</h2>
        {expenses.length > 0 ? (
          <div className="expense-card-grid">
            {expenses.map((expense) => (
              <div key={expense._id} className="expense-card">
                <h3 className="expense-name">{expense.name}</h3>
                <p className="expense-detail">Amount: ${expense.amount}</p>
                <p className="expense-detail">Date: {expense.date}</p>
                <p className="expense-detail">{expense.description}</p>
                <button
                  className="update-button"
                  onClick={() => handleUpdate(expense._id)}
                >
                  Update
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="no-expenses">No expenses found.</p>
        )}
      </div>
    </div>
  );
};

export default ExpenseList;
