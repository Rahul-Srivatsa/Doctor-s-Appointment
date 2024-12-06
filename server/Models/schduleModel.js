const mongoose = require("mongoose");

const schduleSchema = new mongoose.Schema({
    startTime: {
        type: Date,
        default: Date.now,
        required: true
    },
    endTime: {
        type: Date,
        default: Date.now,
        required: true
    },
    link: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Schdule", schduleSchema);
