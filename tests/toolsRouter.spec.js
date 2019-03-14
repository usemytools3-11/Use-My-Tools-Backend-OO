const request = require("supertest");
const server = require("../api/server");
const db = require("../database/dbConfig");
const jwt = require("jsonwebtoken");
const Tools = require("../models/toolsModel");
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
  describe("get /api/users", () => {
    it("should return 200", async () => {
      const token = generateToken(fakeUser);
      await request(server)
        .post("/api/users")
        .send(fakeUser)
        .set("authorization", token);

      const res = await request(server)
        .get("/api/tools")
        .set("authorization", token);
      expect(res.status).toBe(200);
    });
  });

  //   describe("get /api/tools/:id", () => {
  //     it("should return 200", async () => {
  //       const token = generateToken(fakeUser);
  //       await request(server)
  //         .post("/api/users")
  //         .send(fakeUser)
  //         .set("authorization", token);
  //       Tools.add(fakeTool);
  //       const token = generateToken(fakeTool);
  //       const res = await request(server)
  //         .get("/api/tools/1")
  //         .set("authorization", token);
  //       expect(res.status).toBe(200);
  //     });
  //   });

  //   describe("put /api/users", () => {
  //     it("should return 200", async () => {
  //       await Tools.add(fakeUser);
  //       const updatedUser = {
  //         first_name: "test",
  //         last_name: "testing",
  //         email: "updated@gmail.com",
  //         password: "test"
  //       };
  //       const token = generateToken(fakeUser);
  //       const res = await request(server)
  //         .put("/api/tools/1")
  //         .send(updatedTool)
  //         .set("authorization", token);
  //       expect(res.status).toEqual(200);
  //     });
  //   });

  // describe("delete /api/users/:id", () => {
  //   it("should return 200", async () => {
  //     const userToDelete = await Users.add(fakeUser);
  //     const token = generateToken(fakeUser);
  //     const res = await request(server)
  //       .delete("/api/users/1")
  //       .set("authorization", token);

  //     expect(res.status).toBe(200);
  //   });
  // });
});
