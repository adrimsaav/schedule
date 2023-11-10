const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Roles = {
  admin: 'admin',
  client: 'client'
}

const userSchema = new Schema({
  googleId: {
    type: String,
    required: true
  },
  firstName: {
      type: String,
  },
  lastName: {
      type: String,
  },
  phone: {
      type: String,
  },
  email: {
    unique: true,
    type: String,
  },
  role: {
    type: String,
    enum: Object.values(Roles),
    default: Roles.client
  },
  address: {
    street: {
      type: String,
    },
    city: {
      type: String,
    },
    zip: {
      type: String,
    },
  }
}, {
  versionKey: false
});

exports.Roles = Roles;
exports.User = mongoose.model('User', userSchema);
  