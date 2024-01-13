"use client";

import React, {FormEvent, ReactElement} from "react";
import {PromptVariable} from "@/db/entity/prompt_variable";
import {Prompt} from "@/db/entity/prompt";
import {deletePromptVariableById, getPromptVariablesOfPromptId, postPromptVariable} from "@/lib/rest";


interface variable {
    id: number;
    name: string;
    type: string;
}


export function DeleteVariablesButton({id, onClick}: {
    id: number,
    onClick: (event: FormEvent<HTMLFormElement>) => Promise<void>
}): ReactElement {
    return (
        <form onSubmit={onClick} autoComplete={"false"} className={"flex flex-col"}>
            <input type="hidden" name={"id"} value={id}/>
            <button type={"submit"}
                    className={"border shadow rounded flex justify-center items-center p-2 bg-blue-300"}>Delete
            </button>
        </form>
    )
}

export function VariablesForm({promptId, initialVariables}: {
    promptId: number,
    initialVariables: variable[]
}): ReactElement {
    const parsedInitialVariables: PromptVariable[] = initialVariables.map(variable => {
        const v: PromptVariable = new PromptVariable();
        v.id = variable.id;
        v.name = variable.name;
        v.type = variable.type;
        return v;
    })
    const [variables, setVariables] = React.useState<PromptVariable[]>(parsedInitialVariables);
    const [isLoading, setIsLoading] = React.useState<boolean>(false);

    async function refreshVariables(promptId: number): Promise<void> {
        getPromptVariablesOfPromptId(promptId).then((response) => {
            if (response.status === 200) {
                response.json().then((body: { promptVariables: PromptVariable[] }) => {
                    console.log(body);
                    const variables: PromptVariable[] = body.promptVariables.map((variable: any) => {
                        const v: PromptVariable = new PromptVariable();
                        v.id = variable.id;
                        v.name = variable.name;
                        v.type = variable.type;
                        return v;
                    })
                    setVariables(variables);
                })
            }
        })
    }

    async function deleteVariable(event: React.FormEvent<HTMLFormElement>): Promise<void> {
        event.preventDefault();
        setIsLoading(true);
        const formData = new FormData(event.currentTarget);
        const id = formData.get("id");
        if (id) {
            deletePromptVariableById(parseInt(id.toString())).then((response) => {
                if (response.status === 200) {
                    refreshVariables(promptId).then(() => {
                        setIsLoading(false);
                    })
                }
            })
        }
    }

    async function addVariable(event: React.FormEvent<HTMLFormElement>): Promise<void> {
        event.preventDefault();
        setIsLoading(true);
        const formData = new FormData(event.currentTarget);
        const requestVariable = new PromptVariable();
        const name = formData.get("name");
        if (name) {
            requestVariable.name = name.toString();
        }
        const type = formData.get("type");
        if (type) {
            requestVariable.type = type.toString();
        }
        requestVariable.prompt = new Prompt();
        requestVariable.prompt.id = promptId;
        postPromptVariable(requestVariable).then((response) => {
            if (response.status === 200) {
                response.json().then((body) => {
                    refreshVariables(promptId).then(() => {
                        setIsLoading(false);
                    })
                })
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
                                <td><DeleteVariablesButton id={variable.id} onClick={deleteVariable}/></td>
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