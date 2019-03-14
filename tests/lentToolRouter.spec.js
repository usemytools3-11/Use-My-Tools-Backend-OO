const request = require("supertest");
const server = require("../api/server");
const db = require("../database/dbConfig");
const jwt = require("jsonwebtoken");
const Users = require("../models/usersModel");
const lentTools = require("../models/lentToolsModel");
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

const fakeRequest = {
  id: 1,
  borrower_id: 1,
  tool_id: 1
};

const fakeTool = {
  id: 1,
  name: "test",
  price: 5.5,
  lender_id: 1
};

afterEach(async () => {
  await db("lent-tools").truncate();
  await db("tools").truncate();
});

describe("lentToolRouter.js", () => {
  describe("get /api/lent-tools", () => {
    it("should return 200", async () => {
      const token = generateToken(fakeUser);
      const res = await request(server)
        .get("/api/lent-tools")
        .set("authorization", token);
      expect(res.status).toBe(200);
    });
  });

  describe("post /api/lent-tools", () => {
    it("should return 201", async () => {
      await Tools.add(fakeTool);
      const token = generateToken(fakeUser);
      const res = await request(server)
        .post("/api/lent-tools")
        .send(fakeRequest)
        .set("authorization", token);
      expect(res.status).toBe(201);
    });
  });

  describe("delete /api/lent-tools/:id", () => {
    it("should return 200", async () => {
      await Tools.add(fakeTool);
      await lentTools.add(fakeRequest);
      const token = generateToken(fakeUser);
      const res = await request(server)
        .delete("/api/lent-tools/1")
        .set("authorization", token);

      expect(res.status).toBe(200);
    });
  });
});
