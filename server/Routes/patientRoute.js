const express = require("express");
const verifyToken = require("../Middlewares/verifyToken");
const verifyRole = require("../Middlewares/verifyRole");

const {
  getAllDoctors,
  putHistory,
  patientRegister
} = require("../Controllers/patientController");

const router = express.Router();

router.post("/:patientId", verifyToken, verifyRole("patient"), patientRegister);
router.get("/:patientId", verifyToken, verifyRole("patient"), getAllDoctors);
router.put("/:patientId", verifyToken, verifyRole("patient"), putHistory);

module.exports = router;
