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
        await this.setUp();
        return this.prompt.find();
    }

    async getAllActivePrompts(): Promise<Prompt[]> {
        await this.setUp();
        return this.prompt.find({where: {isActive: true}});
    }

    async getPromptById(id: number): Promise<Prompt> {
        await this.setUp();
        return this.prompt.findOneByOrFail({id: id});
    }

    async createPrompt(prompt: Prompt): Promise<Prompt> {
        await this.setUp();
        return this.prompt.save(prompt);
    }

    async getLatestPrompt(): Promise<Prompt> {
        await this.setUp();
        return this.prompt.findOneOrFail({
            order: {id: "DESC"},
            where: {isActive: true}
        });
    }

    async updatePrompt(prompt: Prompt): Promise<void> {
        await this.setUp();
        await this.prompt.update(prompt.id, prompt);
    }

    async deactivatePrompt(prompt: Prompt): Promise<void> {
        await this.setUp();
        await this.prompt.update(prompt.id, {isActive: false});
    }

    async deletePrompt(prompt: Prompt): Promise<void> {
        await this.setUp();
        await this.prompt.delete(prompt.id);
    }

    async getPromptVariablesByQuery(query: PromptVariable): Promise<PromptVariable[]> {
        await this.setUp();
        return this.promptVariable.find({where: query});
    }

    async getPromptVariableById(id: number): Promise<PromptVariable> {
        await this.setUp();
        return this.promptVariable.findOneByOrFail({id: id});
    }

    async deletePromptVariableById(id: number): Promise<void> {
        await this.setUp();
        await this.promptVariable.delete({id: id});
    }

    async updatePromptVariable(promptVariable: PromptVariable): Promise<void> {
        await this.setUp();
        await this.promptVariable.update(promptVariable.id, promptVariable);
    }

    async createPromptVariable(promptVariable: PromptVariable): Promise<PromptVariable> {
        await this.setUp();
        return this.promptVariable.save(promptVariable);
    }

    async deactivatePromptVariable(promptVariable: PromptVariable): Promise<void> {
        await this.setUp();
        await this.promptVariable.update(promptVariable.id, {isActive: false});
    }

    async deletePromptVariable(promptVariable: PromptVariable): Promise<void> {
        await this.setUp();
        await this.promptVariable.delete(promptVariable.id);
    }
}

export const db = new PromptRepository(AppDataSource);