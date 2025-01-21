const express = require("express");
const verifyToken = require("../Middlewares/verifyToken");
const verifyRole = require("../Middlewares/verifyRole");

const {
  putMeeting,
  findFreeSlots,
  getMeetingsByDoctorId,
  getMeetingsByPatientId,
} = require("../Controllers/meetingController");

const router = express.Router();

router.post("/", verifyToken, verifyRole("patient"), putMeeting);
router.get("/findFreeSlots", verifyToken, verifyRole("doctor"), findFreeSlots);
router.get(
  "/getMeetingsByDoctorId/:doctorId",
  verifyToken,
  verifyRole("doctor"),
  getMeetingsByDoctorId
);
router.get(
  "/getMeetingsByPatientId/:patientId",
  verifyToken,
  verifyRole("patient"),
  getMeetingsByPatientId
);

module.exports = router;
