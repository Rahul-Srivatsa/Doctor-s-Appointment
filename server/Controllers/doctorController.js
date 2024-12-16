const DoctorModel = require("../Models/doctorModel");
const { displayError } = require("../Middlewares/dispalyError");

//seeing patients

// 10 1030

const getAllPatients = async (req, res, next) => {
  const { doctorId } = req.params;
  const doctor = await DoctorModel.findById(doctorId);
  if (!doctor) {
    return next(displayError(400, "Doctor ID is not valid"));
  }
  const patients = doctor.patients;
  return res.status(200).json({ patients });
};

const putPatient = async (req, res, next) => {
  const { doctorId } = req.params;
  const { patientId } = req.body;
  const doctor = await DoctorModel.findById(doctorId);
  if (!doctor) {
    return next(displayError(400, "Doctor ID is not valid"));
  }
  doctor.patients.push(patientId);
  return res
    .status(201)
    .json({ message: "Patient added successfully", doctor });
};

const getMeetingsByDoctorId = async (req, res, next) => {
  const { doctorId } = req.params;
  const doctor = await DoctorModel.findById(doctorId);
  if (!doctor) {
    return next(displayError(400, "Doctor ID is not valid"));
  }
  const meetings = doctor.meetings;
  return res.status(200).json({ meetings });
};

module.exports = { getAllPatients, putPatient, getMeetingsByDoctorId };
