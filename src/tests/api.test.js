require("dotenv").config();
const request = require("supertest");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const app = require("../server");


let mongoServer;
let token;
let userId;
let astrologerId;

beforeAll(async () => {
  // Start in-memory MongoDB
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = "mongodb://127.0.0.1:27017/Astrologer?authSource=admin"
  // process.env.MONGO_URI = mongoUri;
  await mongoose.connect(mongoUri);
  app.listen(3000,()=>{
    console.log("server ruuning 3000")
  })
  // Create a test user
  const res = await request(app).post("/api/register").send({ name: "John", password: "1234" });
  userId = res.body.userId;
  console.log(userId)
  // Login test user & get token
  const loginRes = await request(app).post("/api/login").send({ name: "John", password: "1234" });
  token = loginRes.body.token;
  console.log(loginRes.body)
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

// ✅ Test User Registration
test("✅ Register User", async () => {
  const res = await request(app).post("/api/register").send({ name: "TestUser", password: "password" });
  expect(res.statusCode).toBe(200);
  expect(res.body.success).toBe(true);
});

// ✅ Test User Login
test("✅ Login User", async () => {
  const res = await request(app).post("/api/login").send({ name: "John", password: "1234" });
  expect(res.statusCode).toBe(200);
  expect(res.body.success).toBe(true);
  expect(res.body.token).toBeDefined();
});

// ✅ Test Create Astrologer
test("✅ Create Astrologer", async () => {
  const res = await request(app)
    .post("/api/create-astrologer")
    .set("Authorization", `Bearer ${token}`)
    .send({ name: "Astrologer A", rating: 4.8, isTopAstrologer: true });

  expect(res.statusCode).toBe(200);
  expect(res.body.success).toBe(true);
  astrologerId = res.body.astrologerId;
});

// ✅ Test Set Astrologer Priority
test("✅ Set Astrologer Priority", async () => {
  const res = await request(app)
    .post("/api/set-priority")
    .set("Authorization", `Bearer ${token}`)
    .send({ astrologerId, isTopAstrologer: false });

  expect(res.statusCode).toBe(200);
  expect(res.body.success).toBe(true);
});

// ✅ Test Connect User to Astrologer
test("✅ Connect User to Astrologer", async () => {
  const res = await request(app)
    .post("/api/connect")
    .set("Authorization", `Bearer ${token}`)
    .send({ userId });

  expect(res.statusCode).toBe(200);
  expect(res.body.success).toBe(true);
});
