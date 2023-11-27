const mongoose = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const TimestampSchema = new mongoose.Schema({
  

  timestampField: {
    type: Date,
    default: Date.now, 
    get: function(timestamp) {
      return dateFormat(timestamp); // Use the dateFormat utility to format the timestamp
    },
  },
});

const TimestampModel = mongoose.model('TimestampModel', TimestampSchema);

module.exports = TimestampModel;
