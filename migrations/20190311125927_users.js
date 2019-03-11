exports.up = function(knex, Promise) {
  return knex.schema.createTable("users", users => {
    users.increments();
    users.string("first_name", 128).notNullable();
    users.string("last_name", 128).notNullable();
    users
      .string("email")
      .notNullable()
      .unique();
    users.string("photo_url");
    users.string("password", 128).notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("users");
};
