const { Schema, model, SchemaTypes } = require("mongoose");

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  excercise: {
    type: [SchemaTypes.ObjectId],
    ref: "User",
    required: false,
  },
});

const User = model("User", userSchema);
module.exports = User;
