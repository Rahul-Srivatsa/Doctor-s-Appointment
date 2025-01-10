const express = require("express");
const {
  getAllPatients,
  getMeetingsByDoctorId,
} = require("../Controllers/userController");

const router = express.Router();

router.get("/:doctorId", getAllPatients);
router.get("/meetings/:doctorId", getMeetingsByDoctorId);

module.exports = router;
