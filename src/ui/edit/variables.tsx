"use client";

import React, {ReactElement} from "react";
import {DeleteVariablesButton} from "@/ui/button";

interface promptId {
    value: number
}

interface variable {
    id: number;
    name: string;
    value: string;
    type: string;
    description: string;
}


export function Variables({promptId, initialVariables}: {
    promptId: number,
    initialVariables: variable[]
}): ReactElement {
    const [variables, setVariables] = React.useState<variable[]>(initialVariables);
    const [isLoading, setIsLoading] = React.useState<boolean>(false);

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
                <form action={"/api/v1/prompt_variables"} method={"POST"} autoComplete={"false"}
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