const request = require("supertest");
const server = require("../api/server");

describe("server.js", () => {
  describe("get /api", () => {
    it("should return 200", async () => {
      const res = await request(server).get("/api");
      expect(res.body).toEqual("Welcome to Use-My-Tools!");
    });
  });
});
