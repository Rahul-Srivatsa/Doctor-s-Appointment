const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({
  id: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "User",
  },
  history: [
    {
      diagnosis: {
        type: String,
      },
      symptoms: {
        type: [],
        deafult: [],
      },
      prescription: {
        type: [],
        deafult: [],
      },
      solved: {
        type: Boolean,
        default: false,
      },
    },
  ],
});

module.exports = mongoose.model("Patient", patientSchema);
