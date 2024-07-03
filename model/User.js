const { Schema, model, SchemaTypes } = require("mongoose");
const { Exercise, exerciseSchema } = require("./Exercise");

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  exercise: {
    type: [exerciseSchema],
    required: false,
  },
});

const User = model("User", userSchema);
module.exports = User;
