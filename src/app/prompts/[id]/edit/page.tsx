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

            {/* deactivate */}
            <div className={"h-full w-full"}>
                <form
                    action={"/api/v1/prompts"}
                    method={"POST"}
                    autoComplete={"false"}
                    className={"flex flex-col"}
                >
                    <input type={"hidden"} name={"id"} value={prompt.id}/>
                    <input type={"hidden"} name={"isActive"} value={"false"}/>
                    <button type="submit"
                            className={"bg-red-300 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4"}>Delete
                    </button>
                </form>
            </div>

        </div>
    );
}