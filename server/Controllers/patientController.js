const PatientModel = require("../Models/patientModel");
const { displayError } = require("../Middlewares/dispalyError");

const getAllDoctors = async (req, res, next) => {
  const { patientId } = req.params;
  const patient = await PatientModel.findById(patientId);
  if (!patient) {
    return next(displayError(400, "Patient ID is not valid"));
  }
  const doctors = patient.doctors;
  return res.status(200).json({ doctors });
};

const putDoctor = async (req, res, next) => {
  const { patientId } = req.params;
  const { doctorId } = req.body;
  const patient = await PatientModel.findById(patientId);
  if (!patient) {
    return next(displayError(400, "Patient ID is not valid"));
  }
  patient.doctors.push(doctorId);
  return res
    .status(201)
    .json({ message: "Doctor added successfully", patient });
};

const putHistory = async (req, res, next) => {
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
};

const getMeetingsByPatientId = async (req, res, next) => {
  const { patientId } = req.params;
  const patient = await PatientModel.findById(patientId);
  if (!patient) {
    return next(displayError(400, "Patient ID is not valid"));
  }
  const meetings = patient.meetings;
  return res.status(200).json({ meetings });
};

module.exports = {
  getAllDoctors,
  putDoctor,
  putHistory,
  getMeetingsByPatientId,
};
