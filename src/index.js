const app = require("./server");
const connectDB = require("./config/db");
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, async () =>{
  connectDB(process.env.MONGO_URI)
  console.log(` Server running on port ${PORT}`)
} 
);
  


process.on("SIGTERM", () => {
  server.close(() => {
    console.log("Server closed.");
    process.exit(0);
  });
});
