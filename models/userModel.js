const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: [true, 'Email must be unique'],
    lowercase: true,
    validate: [validator.isEmail, 'Please, provide a valid email']
  },
  photo: String,
  password: {
    type: String,
    required: [true, 'Password is required'],
    validate: [
      validator.isAlphaNumeric,
      'Password must have characters and numbers'
    ],
    minlength: 8
  },
  confirmPassword: {
    type: String,
    required: [true, 'Pasword is required']
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
