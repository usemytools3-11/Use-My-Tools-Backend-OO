const request = require("supertest");
const server = require("../api/server");
const db = require("../database/dbConfig");
const jwt = require("jsonwebtoken");
const Users = require("../models/usersModel");
const lentTools = require("../models/lentToolsModel");
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

describe("userRouter.js", () => {
  describe("get /api/users", () => {
    it("should return 200", async () => {
      const token = generateToken(fakeUser);
      const res = await request(server)
        .get("/api/users")
        .set("authorization", token);
      expect(res.status).toBe(200);
    });
  });

  describe("get /api/users/:id", () => {
    it("should return 200", async () => {
      await Users.add(fakeUser);
      const token = generateToken(fakeUser);
      const res = await request(server)
        .get("/api/users/1")
        .set("authorization", token);
      expect(res.status).toBe(200);
    });
  });

  describe("put /api/users", () => {
    it("should return 200", async () => {
      await Users.add(fakeUser);
      const updatedUser = {
        first_name: "test",
        last_name: "testing",
        email: "updated@gmail.com",
        password: "test"
      };
      const token = generateToken(fakeUser);
      const res = await request(server)
        .put("/api/users/1")
        .send(updatedUser)
        .set("authorization", token);
      expect(res.status).toEqual(200);
    });
  });

  describe("delete /api/users/:id", () => {
    it("should return 200", async () => {
      const token = generateToken(fakeUser);
      const userToDelete = await Users.add(fakeUser);
      const res = await request(server)
        .delete("/api/users/1")
        .set("authorization", token);

      expect(res.status).toBe(200);
    });
  });
});
