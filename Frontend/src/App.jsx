import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Registration from "./components/Registration";
import ExpenseTracker from "./components/ExpenseTracker";
import AddExpense from "./components/AddExpense";
import UpdateExpense from "./components/UpdateExpense";
import ExpenseList from "./components/ExpenseList"; 

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route path="/ExpenseTracker" element={<ExpenseTracker />} />
          <Route path="/add-expense" element={<AddExpense />} />
          <Route path="/update-expense/:id" element={<UpdateExpense />} />  {/* Added :id here */}
          <Route path="/expense-list" element={<ExpenseList />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
