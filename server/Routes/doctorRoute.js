const express = require("express");
const verifyToken = require("../Middlewares/verifyToken");
const verifyRole = require("../Middlewares/verifyRole");

const { getAllPatients, doctorRegister } = require("../Controllers/doctorController");

const router = express.Router();

router.post("/:doctorId", verifyToken, verifyRole("doctor"), doctorRegister);
router.get("/:doctorId", verifyToken, verifyRole("doctor"), getAllPatients);

module.exports = router;
