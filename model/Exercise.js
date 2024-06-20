const {Schema, model} = require("mongoose");

const excerciseSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  duration: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    required: false
  }
});

const Excercise = model("Excercise", excerciseSchema);
module.exports = Excercise;