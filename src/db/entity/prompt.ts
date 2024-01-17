"use strict";

import "reflect-metadata";
import type {Relation} from "typeorm";
import {Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";

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

    @ManyToOne(type => Prompt, prompt => prompt.promptVariables)
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

    @OneToMany(type => PromptVariable, promptVariable => promptVariable.prompt, {eager: true})
    promptVariables: Relation<PromptVariable[]>;

    @Column({
        default: true,
        name: "is_active"
    })
    isActive: boolean;

    getActivePromptVariables(): PromptVariable[] {
        return this.promptVariables.filter(promptVariable => promptVariable.isActive);
    }

}