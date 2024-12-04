const express = require("express");
const dotenv = require("dotenv").config();
const port = process.env.PORT || 5001;
const connectDB = require("./Config/dbConnection");

const app = express();
app.use(express.json());

connectDB();

app.listen(port, () => {
    console.log(`server is running on port ${port}`);
});