export const config = () => ({
  appPort: process.env.APP_PORT,
  appSecret: process.env.APP_SECRET,
  databaseConfig: {
    type: process.env.DB_TYPE,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    autoLoadEntities: true,
    synchronize: true,
  },
});
