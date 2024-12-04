const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("DB Connected");
    } catch (error) {
        console.log("DB Connection failed");
        console.log(error);
        process.exit(1);
    }
}

module.exports = connectDB;