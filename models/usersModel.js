db = require("../database/dbConfig");

function get() {
  return db("users");
}

function getBy(filter) {
  return db("users")
    .where(filter)
    .first();
}

function getById(id) {
  return db("users")
    .where(id)
    .first();
}

async function add(user) {
  return await db("users").insert(user, "*");
}

function remove(id) {
  return db("users")
    .where({ id })
    .del();
}

module.exports = {
  get,
  getBy,
  getById,
  add,
  remove
};
