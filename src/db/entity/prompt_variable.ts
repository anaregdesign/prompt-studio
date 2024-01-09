import "reflect-metadata";
import type {Relation} from "typeorm";
import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {IsDate} from "class-validator";
import {Prompt} from "@/db/entity/prompt";

@Entity({name: 'prompt_variables'})
export class PromptVariable {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: "varchar",
        length: 32
    })
    name: string;

    @Column({
        type: "varchar",
        length: 32
    })
    type: string;

    @ManyToOne(type => Prompt, prompt => prompt.promptVariables, {eager: true})
    @JoinColumn(
        {name: "prompt_id"}
    )
    prompt: Relation<Prompt>;

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