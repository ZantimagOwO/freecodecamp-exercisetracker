const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  excercise: {
    type: [mongoose.SchemaTypes.ObjectId],
    ref: 'User'
    required: false,
  },
});

const User = model('User', userSchema);
export default  User;
