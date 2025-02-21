require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");

const app = express();
connectDB();

app.use(express.json());


app.use("/api", require("./routes/apiRoutes"));



module.exports = app;
