const MeetingModel = require("../Models/meetingModel");
const PatientModel = require("../Models/patientModel");
const DoctorModel = require("../Models/doctorModel");
const displayError = require("../Middlewares/displayError");
const mongoose = require("mongoose");

const doctorRegister = async (req, res, next) => {
  try {
    const { doctorId } = req.params;
    const { experience, field, certificate } = req.body;
    console.log(doctorId);  
    const doctor = new DoctorModel({
      id: doctorId,
      experience,
      field,
      certificate,
    });
    await doctor.save();
    return res.status(200).json({ doctor });
  } catch (error) {
    next(error);
  }
};

const getAllPatients = async (req, res, next) => {
  try {
    const { doctorId } = req.params;
    const meetings = await MeetingModel.findById(
      new mongoose.Types.ObjectId(doctorId)
    );
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

module.exports = { getAllPatients, doctorRegister };
