
const mongoose = require('mongoose');

// Define the schema for a user
const UserSchema = new mongoose.Schema({
  //Name of the user
  name: { type: String, required: true },

  //email unique one
  email: { type: String, required: true, unique: true },

  // hashed password
  password: { type: String, required: true }
});

// Export the model used in other parts of the app
module.exports = mongoose.model('User', UserSchema);
