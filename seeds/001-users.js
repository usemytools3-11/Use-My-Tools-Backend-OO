const faker = require("faker");

function createUser() {
  return {
    first_name: faker.name.firstName(),
    last_name: faker.name.lastName(),
    email: faker.internet.email(),
    photo_url: faker.image.avatar(),
    password: "randomPassword"
  };
}

userList = [];

for (let i = 1; i < 20; i++) {
  userList.push(createUser());
}

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("users")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("users").insert(userList);
    });
};
