import "reflect-metadata";
import type {Relation} from "typeorm";
import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
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
        default: true,
        name: "is_active"
    })
    isActive: boolean;

}