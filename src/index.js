const app = require("./server");

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => console.log(` Server running on port ${PORT}`));


process.on("SIGTERM", () => {
  server.close(() => {
    console.log("Server closed.");
    process.exit(0);
  });
});
