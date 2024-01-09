import "reflect-metadata";
import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {PromptVariable} from "@/db/entity/prompt_variable";

@Entity({name: 'prompts'})
export class Prompt {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: "varchar",
        length: 256
    })
    name: string;

    @Column({
        type: "text",
    })
    prompt: string;

    @OneToMany(type => PromptVariable, promptVariable => promptVariable.prompt, {lazy: true})
    promptVariables: Promise<PromptVariable[]>;

    @Column({
        default: true,
        name: "is_active"
    })
    isActive: boolean;

    async GetActivePromptVariables(): Promise<PromptVariable[]> {
        return (await this.promptVariables).filter(promptVariable => promptVariable.isActive);
    }

}