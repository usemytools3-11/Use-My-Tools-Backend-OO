db = require("../database/dbConfig");

function get() {
  return db("tools");
}

function getBy(filter) {
  return db("tools")
    .where(filter)
    .then(tools => dbToJs(tools));
}

async function getById(id) {
  const tool = await db("tools")
    .where({ id })
    .first();

  if (tool) {
    return Promise.resolve(dbToJs(tool));
  } else {
    return Promise.resolve(null);
  }
}

async function add(tool) {
  const [id] = await db("tools").insert(tool, "id");

  return getById(id);
}

function update(id, updatedTool) {
  const tool = await db("tools").where({ id }).update(updatedTool, "id");
  return getById(tool)
}

function remove(id) {
  return db("tools")
    .where({ id })
    .del();
}

function dbToJs(data) {
  if (Array.isArray(data)) {
    return data.map(row => {
      return { ...row, price: Number(row.price) };
    });
  } else {
    return { ...data, price: Number(data.price) };
  }
}

module.exports = {
  get,
  getBy,
  getById,
  add,
  remove,
  update
};
