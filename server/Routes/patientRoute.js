const express = require("express");
const { verifyToken } = require("../Middlewares/verifyToken");
const { verifyRole } = require("../Middlewares/verifyRole");

const {
  getAllDoctors,
  putHistory,
} = require("../Controllers/patientController");
const { verify } = require("jsonwebtoken");
const verifyToken = require("../Middlewares/verifyToken");

const router = express.Router();

router.get("/:patientId", verifyToken, verifyRole("patient"), getAllDoctors);
router.put("/:patientId", verifyToken, verifyRole("patient"), putHistory);

module.exports = router;
