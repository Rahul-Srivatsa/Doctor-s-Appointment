const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
  id: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "User",
  },
  experience: {
    type: Number,
    required: true,
  },
  field: {
    type: String,
    required: true,
  }
});

module.exports = mongoose.model("Doctor", doctorSchema);
