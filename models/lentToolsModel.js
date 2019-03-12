db = require("../database/dbConfig");

function get() {
  return db("lent-tools");
}

function getBy(filter) {
  return db("lent-tools").where(filter);
}

function getById(id) {
  return db("lent-tools")
    .where({ id })
    .first();
}

function update(id, lentTool) {
  return db("lent-tools")
    .where({ id })
    .update(lentTool, "*");
}

async function add(lentTool) {
  const [id] = await db("lent-tools").insert(lentTool, "id");
  return getById(id);
}

function remove(id) {
  return db("lent-tools")
    .where({ id })
    .del();
}

module.exports = {
  get,
  getBy,
  getById,
  add,
  update,
  remove
};
