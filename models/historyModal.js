const mongoose = require("mongoose");

//model
const historySchema = new mongoose.Schema({
  historyText: {
    type: String,
  },
  customDate: {
    type: Date,
  },
  type: {
    type: String,
  },
  createdUser: {
    type: String,
  },
});

const History = mongoose.model("History", historySchema);

module.exports = History;
