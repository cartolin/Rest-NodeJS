import { Connection } from "../../domain/authorized/connection";

const DEVELOPMENT : Connection = {
    PORT: process.env.PORT || 5000,
    DB: {
        username: process.env.DB_USER || 'root',
        password: process.env.DB_PASS || 'root',
        database: process.env.DB_NAME || 'rest-qa'
    },
    host: process.env.DB_HOST || 'localhost',
    dialect: 'mysql'
}

export default DEVELOPMENT;