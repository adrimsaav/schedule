const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userSchema = new Schema({
  name: {
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
      required: true
  },
  timewindow: {
        type: String,
        required: true
      }
}, 
{
  versionKey: false
});

exports.User = mongoose.model('User', userSchema);
  