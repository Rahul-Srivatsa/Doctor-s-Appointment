const express = require("express");
const verifyToken = require("../Middlewares/verifyToken");
const verifyRole = require("../Middlewares/verifyRole");

const { getAllPatients } = require("../Controllers/doctorController");

const router = express.Router();

router.get("/:doctorId", verifyToken, verifyRole("doctor"), getAllPatients);

module.exports = router;
