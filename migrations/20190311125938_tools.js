exports.up = function(knex, Promise) {
  return knex.schema.createTable("tools", tools => {
    tools.increments();
    tools.string("name", 128).notNullable();
    tools.string("photo_url");
    tools.decimal("price").notNullable();
    tools
      .integer("lender_id")
      .notNullable()
      .unsigned()
      .references("id")
      .inTable("users")
      .onDelete("RESTRICT")
      .onUpdate("CASCADE");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("tools");
};
