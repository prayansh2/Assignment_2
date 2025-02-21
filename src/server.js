require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");

const app = express();
connectDB();

app.use(express.json());

// Your routes here
app.use("/api", require("./routes/apiRoutes"));


// ❌ Do NOT call `app.listen(PORT)` here
module.exports = app;
