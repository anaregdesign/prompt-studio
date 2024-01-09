import "reflect-metadata";
import {DataSource} from "typeorm";
import "@/db/entity/prompt";
import {Prompt} from "@/db/entity/prompt";
import {PromptVariable} from "@/db/entity/prompt_variable";

require("dotenv").config({path: ".env.local"});

export const AppDataSource: DataSource = new DataSource({
    type: "mssql",
    host: process.env.MSSQL_HOST,
    port: parseInt(process.env.MSSQL_PORT ? process.env.MSSQL_PORT : "1433"),
    username: process.env.MSSQL_USERNAME,
    password: process.env.MSSQL_PASSWORD,
    database: process.env.MSSQL_DATABASE,
    logging: false,
    synchronize: true,
    entities: [Prompt, PromptVariable],
    migrations: ["src/data/migration/*.ts"],
    // subscribers: ["/src/data/subscriber/**/*.ts"],
});
