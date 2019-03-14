const request = require("supertest");
const server = require("../api/server");
const db = require("../database/dbConfig");
const jwt = require("jsonwebtoken");
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
  first_name: "test",
  last_name: "testing",
  email: "tests@gmail.com"
};

describe("server.js", () => {
  describe("get /api/users", () => {
    it("should return 200", async () => {
      const token = generateToken(fakeUser);
      const res = await request(server)
        .get("/api/users")
        .set("authorization", token);
      expect(res.status).toBe(200);
    });
  });
});
