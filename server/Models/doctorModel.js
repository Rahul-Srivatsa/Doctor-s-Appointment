const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
  id: {
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
  certificate: {
    type: String,
    required: true,
  }
});

module.exports = mongoose.model("Doctor", doctorSchema);