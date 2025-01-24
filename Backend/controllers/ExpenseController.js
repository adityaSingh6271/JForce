const mongoose = require("mongoose");
const Expense = require("../models/Expense");


const getExpenses = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    // Fetch expenses only for the logged-in user
    const expenses = await Expense.find({ userId: req.user.id }); // Filter by userId
    res.status(200).json(expenses);
  } catch (error) {
    console.error("Error fetching expenses:", error);
    res.status(500).json({ message: "Failed to fetch expenses", error });
  }
};




const getExpenseById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid expense ID" });
  }

  try {
    const expense = await Expense.findOne({ _id: id, userId: req.user.id }); // Match ID and user
    if (!expense) {
      return res.status(404).json({ message: "Expense not found or not authorized" });
    }
    res.status(200).json(expense); 
  } catch (error) {
    console.error("Error fetching expense:", error);
    res.status(500).json({ message: "Failed to fetch expense data", error });
  }
};


// Function to add a new expense
const addExpense = async (req, res) => {
  try {
    const { name, amount, date, description } = req.body;

   
    const expense = new Expense({
      name,
      amount,
      date,
      description,
      userId: req.user.id, 
    });

    await expense.save();
    res.status(201).json({ message: "Expense added successfully", expense });
  } catch (error) {
    console.error("Error saving expense:", error);
    res.status(500).json({ message: "Failed to add expense", error });
  }
};

module.exports = { addExpense };



// Function to update an expense by ID
const updateExpense = async (req, res) => {
  const { id } = req.params;
  const { name, amount, date, description } = req.body;

  try {
    const updatedExpense = await Expense.findByIdAndUpdate(
      id,
      { name, amount, date, description },
      { new: true } // Return the updated document
    );

    if (!updatedExpense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    res.status(200).json({
      message: "Expense updated successfully",
      expense: updatedExpense,
    });
  } catch (error) {
    console.error("Error updating expense:", error);
    res.status(500).json({ message: "Failed to update expense", error });
  }
};

module.exports = { updateExpense };



module.exports = { addExpense, getExpenses, getExpenseById, updateExpense };
