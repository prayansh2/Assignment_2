
const express = require("express");


const app = express();
// connectDB();

app.use(express.json());


app.use("/api", require("./routes/apiRoutes"));



module.exports = app;
