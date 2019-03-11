db = require("../database/dbConfig");

function get() {
  return db("users");
}

function getBy(filter) {
  return db("users").where(filter);
}

function getById(id) {
  return db("users").where(id);
}

async function add(user) {
  const [id] = await db("users").insert(user);
  console.log(getById(id));
  return user;
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
