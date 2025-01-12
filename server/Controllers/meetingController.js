const DoctorModel = require("../Models/doctorModel");
const PatientModel = require("../Models/patientModel");
const MeetingModel = require("../Models/meetingModel");
const { displayError } = require("../Middlewares/dispalyError");
const DoctorWorkingHours = ["9:00", "17:00"];

const putMeeting = async (req, res, next) => {
  try {
    const { doctorId, patientId } = req.params;
    const { startTime, endTime, Link } = req.body;

    const doctor = await DoctorModel.findById(doctorId);
    if (!doctor) {
      return next(displayError(400, "Doctor ID is not valid"));
    }
    const patient = await PatientModel.findById(doctorId);
    if (!patient) {
      return next(displayError(400, "Patient ID is not valid"));
    }
    const meet = new MeetingModel({
      doctorId,
      patientId,
      startTime,
      endTime,
      Link,
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
    const { doctorId } = req.params;
    const meetings = await MeetingModel.find({ doctorId });
    if (!meetings) {
      return next(displayError(400, "Doctor ID is not valid"));
    }
    meetings.sort(
      (a, b) => new Date(a.startTime) - new Date(b.startTime)
    );

    const workingStart = new Date();
    workingStart.setHours(9, 0, 0, 0);

    const workingEnd = new Date();
    workingEnd.setHours(17, 0, 0, 0);

    let freeSlots = [];
    let currentTime = new Date(workingStart);

    for (let meeting of meetings) {
      const meetingStart = new Date(meeting.startTime);
      const meetingEnd = new Date(meeting.EndTime);

      if (currentTime < meetingStart) {
        freeSlots.push({
          startTime: new Date(currentTime),
          endTime: new Date(meetingStart),
        });
      }
      if (currentTime < meetingEnd) {
        currentTime = meetingEnd;
      }
    }

    if (currentTime < workingEnd) {
      freeSlots.push({
        startTime: new Date(currentTime),
        endTime: new Date(workingEnd),
      });
    }

    res.status(200).json({ freeSlots });
  } catch (error) {
    next(displayError(500, error.message));
  }
};

module.exports = { putMeeting, findFreeSlots };