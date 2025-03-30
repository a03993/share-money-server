const mongoose = require("mongoose");

const settlementSchema = new mongoose.Schema({
  payer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  payee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "done"],
    default: "pending",
  },
  linkId: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Settlement", settlementSchema);
