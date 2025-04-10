const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  // connect to link
  linkId: {
    type: String,
    required: true,
    index: true,
  },
});

module.exports = mongoose.model("User", userSchema);
