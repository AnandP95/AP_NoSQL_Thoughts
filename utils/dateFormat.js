const mongoose = require('mongoose');
const moment = require('moment');

const TimestampSchema = new mongoose.Schema({
  timestampField: {
    type: Date,
    default: Date.now,
    get: function (timestamp) {
      return moment(timestamp).format('YYYY-MM-DD HH:mm:ss'); // Format using moment.js
    },
  },
});

const TimestampModel = mongoose.model('TimestampModel', TimestampSchema);

module.exports = TimestampModel;
