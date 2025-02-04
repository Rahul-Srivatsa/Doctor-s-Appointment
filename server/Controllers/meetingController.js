const DoctorModel = require("../Models/doctorModel");
const PatientModel = require("../Models/patientModel");
const MeetingModel = require("../Models/meetingModel");
const displayError = require("../Middlewares/displayError");
const mongoose = require("mongoose");

const putMeeting = async (req, res, next) => {
  try {
    const { patientId } = req.params;
    const { doctorId, startTime, endTime, link } = req.body;

    const doctor = await DoctorModel.findById(
      new mongoose.Types.ObjectId(doctorId)
    );
    if (!doctor) {
      return next(displayError(400, "Doctor ID is not valid"));
    }

    const patient = await PatientModel.findById(
      new mongoose.Types.ObjectId(patientId)
    );
    if (!patient) {
      return next(displayError(400, "Patient ID is not valid"));
    }

    // Convert input times to Date objects
    const start = new Date(startTime);
    const end = new Date(endTime);

    // Set working hours range for the same date
    const workingStart = new Date(start);
    workingStart.setHours(9, 0, 0, 0);

    const workingEnd = new Date(start);
    workingEnd.setHours(17, 0, 0, 0);

    if (start < workingStart || end > workingEnd) {
      return next(
        displayError(400, "Meeting time is not within working hours")
      );
    }
    const diffMs = end.getTime() - start.getTime(); // Difference in milliseconds
    const diffMinutes = diffMs / (1000 * 60); // Convert to minutes

    if (diffMinutes !== 60) {
      return next(
        displayError(400, "Meeting time must be exactly 1 hour long")
      );
    }

    const meet = new MeetingModel({
      doctorId,
      patientId,
      startTime: start,
      endTime: end,
      link,
    });

    const createdMeeting = await meet.save();
    return res
      .status(201)
      .json({ message: "Meeting added successfully", doctor, patient });
  } catch (error) {
    next(displayError(500, error.message));
  }
};

const findFreeSlots = async (req, res, next) => {
  try {
    const { doctorId } = req.body;
    const doctor = await DoctorModel.findById(new mongoose.Types.ObjectId(doctorId));
    if (!doctor) {
      return next(displayError(400, "Doctor ID is not valid"));
    }
    const meetings = await MeetingModel.find({ doctorId });
    if (!meetings) {
      return next(displayError(400, "Doctor ID is not valid"));
    }
    const workingHours = doctor.workingHours;
    const freeSlots = [];
    
    for (let timeSlot of workingHours) {
      // Check if the timeSlot is not in meetings
      if (!meetings.some(meeting => 
          meeting.startTime.getTime() === timeSlot.startTime.getTime() &&
          meeting.endTime.getTime() === timeSlot.endTime.getTime())) {
        freeSlots.push(timeSlot);
      }
    }
    
    res.status(200).json({ freeSlots });
  } catch (error) {
    next(displayError(500, error.message));
  }
};

const getMeetingsByDoctorId = async (req, res, next) => {
  try {
    const { doctorId } = req.params;
    const meetings = await MeetingModel.find({ doctorId });
    if (!meetings) {
      return next(displayError(400, "No meetings found"));
    }
    return res.status(200).json({ meetings });
  } catch (error) {
    next(displayError(500, error.message));
  }
};

const getMeetingsByPatientId = async (req, res, next) => {
  try {
    const { patientId } = req.params;
    const meetings = await MeetingModel.find({ patientId });
    if (!meetings) {
      return next(displayError(400, "No meetings found"));
    }
    return res.status(200).json({ meetings });
  } catch (error) {
    next(displayError(500, error.message));
  }
};

module.exports = {
  putMeeting,
  findFreeSlots,
  getMeetingsByDoctorId,
  getMeetingsByPatientId,
};
