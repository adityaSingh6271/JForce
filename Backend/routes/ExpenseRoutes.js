const express = require("express");
const router = express.Router();
const { protect } = require("../middlewares/authMiddleware"); // Import protect middleware
const ExpenseController = require("../controllers/ExpenseController");


router.post("/expenses", protect, ExpenseController.addExpense);


router.get("/expenses", protect, ExpenseController.getExpenses);


router.get("/expenses/:id", protect, ExpenseController.getExpenseById);


router.put("/expenses/:id", protect, ExpenseController.updateExpense);

module.exports = router;
