exports.up = function(knex, Promise) {
  return knex.schema.createTable("lent-tools", tbl => {
    tbl.increments();
    tbl
      .integer("borrower_id")
      .notNullable()
      .unsigned()
      .references("id")
      .inTable("users")
      .onDelete("RESTRICT")
      .onUpdate("CASCADE");
    tbl
      .integer("tool_id")
      .notNullable()
      .unsigned()
      .references("id")
      .inTable("tools")
      .onDelete("RESTRICT")
      .onUpdate("CASCADE");
    tbl.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("lent-tools");
};
