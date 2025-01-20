const express = require("express");
const dotenv = require("dotenv").config();
const port = process.env.PORT || 5001;
const connectDB = require("./Config/dbConnection");
const cors = require("./Middlewares/cors");

const userRoute = require("./Routes/userRoute");
const patientRoute = require("./Routes/patientRoute");
const doctorRoute = require("./Routes/doctorRoute");
const meetingRoute = require("./Routes/meetingRoute");

const app = express();

app.use(cors);
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

app.use("/api/user/", userRoute);
app.use("/api/patient/", patientRoute);
app.use("/api/doctor/", doctorRoute);
app.use("/api/meeting/", meetingRoute);

connectDB();

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
