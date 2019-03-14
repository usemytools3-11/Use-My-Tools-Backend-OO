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

//without this, number is stored as a string when using postgres, and gives an error because server does not recognize that string
//changes string back to number
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
