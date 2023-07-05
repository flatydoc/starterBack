const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, ENDPOINT_ID, PGPORT } =
  process.env;

export default {
  postgres: {
    options: {
      host: PGHOST,
      port: PGPORT,
      database: PGDATABASE,
      username: PGUSER,
      password: PGPASSWORD,
      dialect: "postgres",
      logging: false,
      native: true,
    },
  },
};
