const PatientModel = require("../Models/patientModel");
const MeetingModel = require("../Models/meetingModel");
const DoctorModel = require("../Models/doctorModel");
const displayError = require("../Middlewares/displayError");

const patientRegister = async (req, res, next) => {
  try {
    const { patientId } = req.params;
    const { history } = req.body;
    const patient = new PatientModel({
      _id: patientId,
      history: history || [],
    });
    await patient.save();
    return res.status(201).json({ message: "Patient registered successfully" });
  } catch (error) {
    next(error);
  }
};

const getAllDoctors = async (req, res, next) => {
  try {
    const { patientId } = req.params;
    const meetings = await MeetingModel.find({patientId});
    if (!meetings) {
      return next(displayError(400, "No doctors found"));
    }
    const doctorIds = meetings.map((meeting) => meeting.doctorId);
    const doctors = await DoctorModel.find({ _id: { $in: doctorIds } });
    return res.status(200).json({ doctors });
  } catch (error) {
    next(displayError(500, error.message));
  }
};

const putHistory = async (req, res, next) => {
  try {
    const { patientId } = req.params;
    const { diagnosis, symptoms, prescription, solved } = req.body;
    const patient = await PatientModel.findById(patientId);
    if (!patient) {
      return next(displayError(400, "Patient ID is not valid"));
    }
    const history = { diagnosis, symptoms, prescription, solved };
    patient.history.push(history);
    await patient.save();
    return res
      .status(201)
      .json({ message: "History added successfully", patient });
  } catch (error) {
    next(displayError(500, error.message));
  }
};

module.exports = {
  getAllDoctors,
  putHistory,
  patientRegister,
};
