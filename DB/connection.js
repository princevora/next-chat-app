export const connecton = {
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD,
    username: process.env.DB_USERNAME,
    port: parseInt(process.env.DB_PORT),
    database: process.env.DB_DATABASE
}