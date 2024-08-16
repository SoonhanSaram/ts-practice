export default {
    development: {
      username: process.env.NEXT_PUBLIC_DB_USERNAME || 'root',
      password: process.env.NEXT_PUBLIC_DB_PASSWD,
      database: process.env.NEXT_PUBLIC_DB,
      host: "127.0.0.1",
      port : process.env.NEXT_PUBLIC_DB_PORT,
      dialect: "mysql",
      logging: true,
    },
    test: {
      username: process.env.NEXT_PUBLIC_DB_USERNAME || 'root',
      password: process.env.NEXT_PUBLIC_DB_PASSWD,
      database: process.env.NEXT_PUBLIC_DB,
      host: "127.0.0.1",
      port : process.env.NEXT_PUBLIC_DB_PORT,
      logging: true,
      dialect: "mysql",
    },
    production: {
      username: "root",
      password: "password",
      database: "sample",
      host: "127.0.0.1",
      dialect: "mysql",
    },
  };