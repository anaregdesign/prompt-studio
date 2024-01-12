"use server";

import {ReactElement} from "react";
import {db} from "@/lib/data";
import {Variables} from "@/ui/edit/variables";


export default async function Page({params}: { params: { id: string } }): Promise<ReactElement> {
    const prompt = await db.getPromptById(parseInt(params.id));
    const variables = await prompt.getActivePromptVariables();
    const variableArgs = variables.map(variable => {
        return {
            id: variable.id,
            name: variable.name,
            type: variable.type,
            promptId: variable.prompt.id
        }
    });

    return (
        <div>
            <Variables promptId={prompt.id} initialVariables={variableArgs}/>
            <div>
                <h1 className={"font-extrabold p-2 bg-gray-400"}>Prompt</h1>
                <form action={"/api/v1/prompts"} method={"POST"} autoComplete={"false"} className={"flex flex-col"}>
                    <input type="hidden" name="id" value={prompt.id}/>
                    <label>Name</label>
                    <input type="text" name="name" defaultValue={prompt.name} className={"border shadow p-2"}/>
                    <label>Prompt</label>
                    <textarea name="prompt" defaultValue={prompt.prompt} className={"border shadow p-2"}/>
                    <button type="submit"
                            className={"bg-blue-300 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"}>Submit
                    </button>
                </form>
            </div>
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