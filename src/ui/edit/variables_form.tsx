"use client";

import React, {FormEvent, ReactElement} from "react";
import {createPromptVariable, deletePromptVariable, getPromptVariables} from "@/lib/rest";
import {PromptVariable} from "@/db/entity/prompt";


interface variable {
    id: number;
    name: string;
    type: string;
}


function DeleteVariablesButton({promptId, promptVariableId}: {
    promptId: number,
    promptVariableId: number,
}): ReactElement {
    return (
        <form
            onSubmit={(event: FormEvent<HTMLFormElement>) => {
                event.preventDefault();
                deletePromptVariable(promptId, promptVariableId).then((response) => {
                    if (response.status === 200) {
                        window.location.reload();
                    }
                })

            }}
            autoComplete={"false"}
            className={"flex flex-col"}>
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
        getPromptVariables(promptId).then((response) => {
            if (response.status === 200) {
                response.json().then((body: { promptVariables: PromptVariable[] }) => {
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
        const promptVariableId = formData.get("id");
        if (promptVariableId) {
            deletePromptVariable(promptId, Number(promptVariableId)).then((response) => {
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
        createPromptVariable(promptId, requestVariable).then((response) => {
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
                                <td><DeleteVariablesButton promptId={promptId} promptVariableId={variable.id}/></td>
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