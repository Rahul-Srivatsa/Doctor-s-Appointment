const PatientModel = require("../Models/patientModel");
const MeetingModel = require("../Models/meetingModel");
const displayError = require("../Middlewares/displayError");

const getAllDoctors = async (req, res, next) => {
  try {
    const { patientId } = req.params;
    const meetings = await MeetingModel.findById({ patientId });
    if (!meetings) {
      return next(displayError(400, "No meetings found"));
    }
    const doctors = [];
    for (let i = 0; i < meetings.length; i++) {
      const doctor = await DoctorModel.findById(meetings[i].doctorId);
      doctors.push(doctor);
    }
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
};
