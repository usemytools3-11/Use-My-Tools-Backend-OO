const localPgConnection = {
  host: "localhost",
  database: "my_db",
  user: "username",
  password: "password"
};
const prodDbConnection = process.env.DATABASE_URL || localPgConnection;

module.exports = {
  development: {
    client: "sqlite3",
    connection: {
      filename: "./database/dev.sqlite3"
    },
    useNullAsDefault: true
  },
  production: {
    client: "pg",
    connection: prodDbConnection,
    migrations: {
      directory: "./migrations"
    },
    seeds: {
      directory: "./seeds"
    }
  }
};
