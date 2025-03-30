const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema({
  item: { type: String, required: true },
  price: { type: Number, required: true },
  payer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  sharedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  linkId: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Expense", expenseSchema);
