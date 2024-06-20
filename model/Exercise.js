const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ExcercieService = new Schema({
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
  },
  _id: "5fb5853f734231456ccb3b05",
});

const User = model("User", userSchema);
export default User;
