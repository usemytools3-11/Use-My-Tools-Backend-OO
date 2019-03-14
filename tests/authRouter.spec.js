const request = require("supertest");
const server = require("../api/server");
const bcrypt = require("bcryptjs");
const db = require("../database/dbConfig");
const jwt = require("jsonwebtoken");
const Users = require("../models/usersModel");
const secret = process.env.JWT_SECRET || "secret";

function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.first_name
  };
  const options = {
    expiresIn: "1d"
  };
  return jwt.sign(payload, secret, options);
}

const fakeUser = {
  id: 1,
  first_name: "test",
  last_name: "testing",
  email: "tests@gmail.com",
  password: "test"
};

afterEach(async () => {
  await db("users").truncate();
});

describe("server.js", () => {
  describe("post /api/auth/register", () => {
    it("should return 201", async () => {
      const token = generateToken(fakeUser);
      const res = await request(server)
        .post("/api/auth/register")
        .send(fakeUser);

      expect(res.status).toBe(201);
    });
  });

  describe("post /api/auth/login", () => {
    it("should return 200", async () => {
      await request(server)
        .post("/api/auth/register")
        .send(fakeUser);
      const res = await request(server)
        .post("/api/auth/login")
        .send(fakeUser);

      expect(res.status).toBe(200);
    });
  });

  //   describe("get /api/auth/authorization", () => {
  //     it("should return 200", async () => {
  //       const token = generateToken(fakeUser);
  //       const res = await request(server)
  //         .get("/api/auth/authorization")
  //         .set("authorization", token);
  //       expect(res.status).toBe(200);
  //     });
  //   });
});
