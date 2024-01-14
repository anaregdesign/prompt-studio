"use server";

import {ReactElement} from "react";
import {db} from "@/lib/data";
import {VariablesForm} from "@/ui/edit/variables_form";
import {PromptForm} from "@/ui/edit/prompt_form";


export default async function Page({params}: { params: { id: string } }): Promise<ReactElement> {
    const prompt = await db.getPromptById(parseInt(params.id));
    const variables = await prompt.getActivePromptVariables();
    const variableArgs = variables.map(variable => {
        return {
            id: variable.id,
            name: variable.name,
            type: variable.type,
            promptId: prompt.id
        }
    });

    return (
        <div>
            <VariablesForm promptId={prompt.id} initialVariables={variableArgs}/>
            <PromptForm id={prompt.id} name={prompt.name} prompt={prompt.prompt}/>
        </div>
    );
}