const MeetingModel = require("../Models/meetingModel");
const PatientModel = require("../Models/patientModel");
const displayError = require("../Middlewares/displayError");
const mongoose = require("mongoose");

const getAllPatients = async (req, res, next) => {
  try {
    const { doctorId } = req.params;
    const meetings = await MeetingModel.findById(new mongoose.Types.ObjectId(doctorId));
    if (!meetings) {
      return next(displayError(400, "No patients found"));
    }
    const patients = [];
    for (let i = 0; i < meetings.length; i++) {
      const patient = await PatientModel.findById(meetings[i].patientId);
      patients.push(patient);
    }
    return res.status(200).json({ patients });
  } catch (error) {
    next(displayError(500, error.message));
  }
};

module.exports = { getAllPatients };
