const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const apptSchema = new Schema({
  date: {
    type: Date,
    required: true,
  },

  userId: {
    type: ObjectId,
    required: true
  },

  firstName: {
    type: String,
},
  lastName: {
    type: String,
  },

  comment: {
    type: String,
    default: false,
  },

}, {versionKey: false});

module.exports = mongoose.model('Appt', apptSchema);
