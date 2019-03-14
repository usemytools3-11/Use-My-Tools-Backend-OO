const request = require("supertest");
const server = require("../api/server");
const db = require("../database/dbConfig");
const jwt = require("jsonwebtoken");
const Tools = require("../models/toolsModel");
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

const fakeTool = {
  id: 1,
  name: "test",
  price: 5.5,
  lender_id: 1
};

afterEach(async () => {
  await db("tools").truncate();
});

describe("server.js", () => {
  describe("get /api/tools", () => {
    it("should return 200", async () => {
      const token = generateToken(fakeUser);
      const res = await request(server)
        .get("/api/tools")
        .set("authorization", token);
      expect(res.status).toBe(200);
    });
  });

  describe("get /api/tools/:id", () => {
    it("should return 200", async () => {
      const token = generateToken(fakeUser);
      Tools.add(fakeTool);
      const res = await request(server)
        .get("/api/tools/1")
        .set("authorization", token);
      expect(res.status).toBe(200);
    });
  });

  describe("post /api/tools", () => {
    it("should return 201", async () => {
      const token = generateToken(fakeUser);
      const res = await request(server)
        .post("/api/tools")
        .send(fakeTool)
        .set("authorization", token);
      expect(res.status).toBe(201);
    });
  });

  describe("put /api/tools", () => {
    it("should return 200", async () => {
      await Tools.add(fakeTool);
      const updatedTool = {
        id: 1,
        name: "hammer",
        price: 5.5,
        lender_id: 1
      };
      const token = generateToken(fakeUser);
      const res = await request(server)
        .put("/api/tools/1")
        .send(updatedTool)
        .set("authorization", token);
      expect(res.status).toEqual(200);
    });
  });

  describe("delete /api/tools/:id", () => {
    it("should return 200", async () => {
      await Tools.add(fakeTool);
      const token = generateToken(fakeUser);
      const res = await request(server)
        .delete("/api/tools/1")
        .set("authorization", token);

      expect(res.status).toBe(200);
    });
  });
});
