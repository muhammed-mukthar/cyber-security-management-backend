const mongoose = require("mongoose");
const { Schema } = mongoose;

// Define the schema
const quizOptionsSchema = new Schema({
  number: {
    type: Number,
  },
  question: {
    type: String,
    required: true,
  },
  answer: {
    type: String,
    required: true,
  },
  options: {
    type: [String],
    required: true,
  },
});

// Define pre-save middleware to auto-increment the 'number' field
quizOptionsSchema.pre("save", async function (next) {
  if (!this.isNew) return next();

  try {
    const lastDocument = await this.constructor.findOne(
      {},
      { number: 1 },
      { sort: { number: -1 } }
    );
    if (lastDocument) {
      this.number = lastDocument.number + 1;
    } else {
      this.number = 1;
    }
    next();
  } catch (error) {
    next(error);
  }
});

// Create and export the model
const QuizOptions = mongoose.model("QuizOptions", quizOptionsSchema);
module.exports = QuizOptions;
