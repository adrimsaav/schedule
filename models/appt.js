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

  comment: {
    type: String,
    default: false,
  },

  timeWindow: {
    morning: {
        type: Boolean,
        default: false,
      },
      afternoon: {
        type: Boolean,
        default: false,
      }
  },

}, {versionKey: false});

module.exports = mongoose.model('Appt', apptSchema);
