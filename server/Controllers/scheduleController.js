const DoctorModel = require("../Models/doctorModel");
const ScheduleModel = require("../Models/scheduleModel");
const { displayError } = require("../Middlewares/dispalyError");

//free slots
//seeing patients
//diagnosis
//prescription

// 10 1030
const putMeeting = async (req, res, next) => {
  const { doctorId } = req.params;
  const { startTime, endTime, Link } = req.body;

  const doctor = await DoctorModel.findById(doctorId);
  if (!doctor) {
    return next(displayError(400, "Doctor ID is not valid"));
  }

  const meet = new ScheduleModel({ startTime, endTime, Link });
  doctor.meetings.push(meet);
  return res
    .status(201)
    .json({ message: "Meeting added successfully", doctor });
};

module.exports = { putMeeting };
