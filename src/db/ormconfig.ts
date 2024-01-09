import "reflect-metadata";
import {DataSource} from "typeorm";
import "@/db/entity/prompt";
import {Prompt} from "@/db/entity/prompt";
import {PromptVariable} from "@/db/entity/prompt_variable";

export const AppDataSource: DataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "postgres",
    database: "postgres",
    logging: false,
    synchronize: true,
    entities: [Prompt, PromptVariable],
    migrations: ["src/db/migration/*.ts"],
    // subscribers: ["/src/db/subscriber/**/*.ts"],
});
