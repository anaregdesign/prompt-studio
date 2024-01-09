import "reflect-metadata";
import {DataSource, Repository} from "typeorm";
import {Prompt} from "@/db/entity/prompt";
import {PromptVariable} from "@/db/entity/prompt_variable";
import {AppDataSource} from "@/db/ormconfig";

class PromptRepository {
    dataSource: DataSource
    prompt: Repository<Prompt>
    promptVariable: Repository<PromptVariable>

    constructor(dataSource: DataSource) {
        this.dataSource = dataSource
    }

    async setUp(): Promise<void> {
        if (!this.dataSource.isInitialized) {
            await this.dataSource.initialize().then(() => console.log("DataSource initialized"))
        }
        if (!this.prompt) {
            this.prompt = this.dataSource.getRepository(Prompt)
        }
        if (!this.promptVariable) {
            this.promptVariable = this.dataSource.getRepository(PromptVariable)
        }
    }

    async getAllPrompts(): Promise<Prompt[]> {
        await this.setUp()
        return this.prompt.find();
    }

    async getPromptById(id: number): Promise<Prompt> {
        await this.setUp()
        return this.prompt.findOneByOrFail({id: id})
    }
}

export const db = new PromptRepository(AppDataSource);