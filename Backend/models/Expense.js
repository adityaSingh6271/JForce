const mongoose = require("mongoose");

const ExpenseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  amount: { type: Number, required: true },
  date: { type: Date, required: true },
  description: { type: String },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Associate expense with a user
});

module.exports = mongoose.model("Expense", ExpenseSchema);
