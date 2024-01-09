import "reflect-metadata";
import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {IsDate} from "class-validator";
import {PromptVariable} from "@/db/entity/prompt_variable";

@Entity({name: 'prompts'})
export class Prompt {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: "text",
    })
    prompt: string;

    @OneToMany(type => PromptVariable, promptVariable => promptVariable.prompt, {lazy: true})
    promptVariables: Promise<PromptVariable[]>;

    @Column({
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP",
        name: "created_at"
    })

    @IsDate()
    createdAt: Date;

    @Column({
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP",
        name: "updated_at"
    })
    @IsDate()
    updatedAt: Date;

    @Column({
        type: "boolean",
        default: true,
        name: "is_active"
    })
    isActive: boolean;

}