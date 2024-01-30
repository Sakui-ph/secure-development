import { ConnectionOptions } from "mysql2/promise";

export const databaseConfig : ConnectionOptions = {
    host: "127.0.0.1",
    password: "admin",
    port: 3306,
    database: "secure_development_schema",
    user: "root",
}