const mongoose = require("mongoose");

const linkSchema = new mongoose.Schema({
  linkId: {
    type: String,
    required: true,
    unique: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  expiresAt: {
    type: Date,
    required: true
  },
  isSettled: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model("Link", linkSchema);