const MeetingModel = require("../Models/meetingModel");
const PatientModel = require("../Models/patientModel");
const DoctorModel = require("../Models/doctorModel");
const displayError = require("../Middlewares/displayError");

const doctorRegister = async (req, res, next) => {
  try {
    const { doctorId } = req.params;
    const { experience, field, workingHours, certificate } = req.body; 
    const doctor = new DoctorModel({
      _id: doctorId,
      experience,
      field,
      workingHours,
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
    const meetings = await MeetingModel.find({doctorId});
    if (!meetings) {
      return next(displayError(400, "No patients found"));
    }
    const patientIds = meetings.map((meeting) => meeting.patientId);
    const patients = await PatientModel.find({ _id: { $in: patientIds } });
    return res.status(200).json({ patients });
  } catch (error) {
    next(displayError(500, error.message));
  }
};

module.exports = { getAllPatients, doctorRegister };
