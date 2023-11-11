const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userSchema = new Schema({
  googleId: {
    type: String,
    required: true
  },
  firstName: {
      type: String,
      required: true,
  },
  lastName: {
      type: String,
      required: true,
  },
  phone: {
      type: String,
  },
  email: {
    unique: true,
    type: String,
  },
  address: {
      type: String,
  },
  timewindow: {
    morning: {
        type: String,
        required: true,
      },
      afternoon: {
        type: String,
        required: true,
      }
  },
}, 
{
  versionKey: false
});

exports.User = mongoose.model('User', userSchema);
  