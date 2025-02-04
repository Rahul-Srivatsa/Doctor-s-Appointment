const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  experience: {
    type: Number,
    required: true,
  },
  field: {
    type: String,
    required: true,
  },
  workingHours: [
    {
      startTime: {
        type: Date,
        required: true,
      },
      endTime: {
        type: Date,
        required: true,
      },
    }
  ],
  certificate: {
    type: String,
    required: true,
  }
});

module.exports = mongoose.model("Doctor", doctorSchema);