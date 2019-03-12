db = require("../database/dbConfig");

function get() {
  return db("tools");
}

function getBy(filter) {
  return db("tools").where(filter);
}

function getById(id) {
  return db("tools")
    .where({ id })
    .first();
}

async function add(tool) {
  console.log("price type: ", typeof tool.price);
  const [id] = await db("tools").insert(tool, "*");
  return getById(id);
}

function update(id, newTool) {
  return db("tools")
    .where({ id })
    .update(newTool, "*");
}
function remove(id) {
  return db("tools")
    .where({ id })
    .del();
}

module.exports = {
  get,
  getBy,
  getById,
  add,
  remove,
  update
};
