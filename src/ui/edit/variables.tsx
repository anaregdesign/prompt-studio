"use client";

import React, {ReactElement} from "react";
import {DeleteVariablesButton} from "@/ui/button";
import {PromptVariable} from "@/db/entity/prompt_variable";
import {Prompt} from "@/db/entity/prompt";


interface variable {
    id: number;
    name: string;
    type: string;
}


export function Variables({promptId, initialVariables}: {
    promptId: number,
    initialVariables: variable[]
}): ReactElement {
    const parsedInitialVariables: PromptVariable[] = initialVariables.map(variable => {
        const v: PromptVariable = new PromptVariable();
        v.id = variable.id;
        v.name = variable.name;
        v.type = variable.type;
        v.prompt = new Prompt();
        v.prompt.id = promptId;
        return v;
    })
    const [variables, setVariables] = React.useState<PromptVariable[]>(parsedInitialVariables);
    const [isLoading, setIsLoading] = React.useState<boolean>(false);

    async function refreshVariables(promptId: number) {
        const requestBody: string = JSON.stringify({
            promptId: promptId,
            isActive: true
        })
        const requestUrl: string = `/api/v1/prompt_variables/${new URLSearchParams({id: promptId.toString()})}`

        fetch(requestUrl).then((response) => {
            response.json().then((responseBody: string) => {
                const prompt: Prompt = JSON.parse(responseBody);
                prompt.promptVariables.then((variables: PromptVariable[]) => {
                    setVariables(variables);
                })
            })
        })
    }

    async function addVariable(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setIsLoading(true);
        const formData = new FormData(event.currentTarget);
        const requestBody: string = JSON.stringify({
            name: formData.get("name"),
            type: formData.get("type"),
            prompt: {
                id: promptId
            }
        })
        fetch("/api/v1/prompt_variables", {
            method: "POST",
            body: requestBody,
            headers: {
                "Content-Type": "application/json"
            }
        }).then((response) => {
            if (response.status === 200) {
                refreshVariables(promptId);
                setIsLoading(false);
            }
        })
    }

    return (
        <div>
            {/* list of variables */}
            <div>
                <h1 className={"font-extrabold p-2 bg-gray-400"}>Variables</h1>
                <table className={"border"}>
                    <thead>
                    <tr className={"border"}>
                        <th>Variable Name</th>
                        <th>Variable Type</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {variables.map(variable => {
                        return (
                            <tr key={variable.name}>
                                <td>{`{{${variable.name}}}`}</td>
                                <td>{variable.type}</td>
                                <td><DeleteVariablesButton id={variable.id}/></td>
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
            </div>

            {/* add variable */}
            <div>
                <h1 className={"font-extrabold p-2 bg-gray-400"}>Add Variable</h1>
                <form onSubmit={addVariable} autoComplete={"false"}
                      className={"flex flex-col"}>
                    <input type="hidden" name="promptId" value={promptId}/>
                    <label>Name</label>
                    <input type="text" name="name" autoComplete={"false"} className={"border shadow p-2"}/>
                    <label>Type</label>
                    <select name="type" className={"border shadow p-2"}>
                        <option value="string">string</option>
                        <option value="number">number</option>
                        <option value="text">text</option>
                    </select>
                    <button type="submit"
                            className={"bg-blue-300 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"}>Add
                    </button>
                </form>
            </div>
        </div>
    )
}