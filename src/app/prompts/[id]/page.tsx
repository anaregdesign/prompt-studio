"use server";

import {ReactElement} from "react";
import {EntityNotFoundError} from "typeorm";
import NotFound from "next/dist/client/components/not-found-error";
import {db} from "@/lib/data";
import {Prompt, PromptVariable} from "@/db/entity/prompt";
import {Form, State} from "@/ui/form";
import Link from "next/link";


export default async function Page({params}: { params: { id: string } }): Promise<ReactElement> {
    try {
        const prompt: Prompt = await db.getPromptById(parseInt(params.id));
        const variables: PromptVariable[] = prompt.promptVariables;
        const states: State[] = variables.map(variable => {
            return {
                name: variable.name,
                type: variable.type,
                value: variable.name
            }
        });

        return (
            <div className={"w-full h-full"}>
                <Link
                    className={"w-full h-10 flex flex-col justify-center items-center bg-blue-300 hover:bg-blue-700 text-white font-extrabold"}
                    href={`/prompts/${prompt.id.toString()}/edit`}>
                    Edit
                </Link>
                <Form prompt={prompt.prompt} variables={states}/>
            </div>
        );
    } catch (e) {
        if (e instanceof EntityNotFoundError) {
            return NotFound();
        } else {
            throw e;
        }
    }
}