import { Options } from "sequelize"

export interface Connection extends Options {
    PORT: string | number,
    DB: {
        username: string,
        password: string,
        database: string
    }
}