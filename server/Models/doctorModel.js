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
    },
    freeSlots: {
        type: [],
        default: [],
    },
    patients: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Patient",
        default: [],
    },
});

module.exports = mongoose.model("Doctor", doctorSchema);
