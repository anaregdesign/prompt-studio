"use server";

import {ReactElement} from "react";
import {db} from "@/lib/data";
import {DeleteVariablesButton} from "@/ui/button";


export default async function Page({params}: { params: { id: string } }): Promise<ReactElement> {
    const prompt = await db.getPromptById(parseInt(params.id));
    const variables = await prompt.getActivePromptVariables();

    return (
        <div>
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
            <div>
                <h1 className={"font-extrabold p-2 bg-gray-400"}>Add Variable</h1>
                <form action={"/api/v1/prompt_variables"} method={"POST"} autoComplete={"false"}
                      className={"flex flex-col"}>
                    <input type="hidden" name="promptId" value={prompt.id}/>
                    <label>Name</label>
                    <input type="text" name="name" autoComplete={"false"} className={"border shadow p-2"}/>
                    <label>Type</label>
                    <select name="type" className={"border shadow p-2"}>
                        <option value="string">string</option>
                        <option value="number">number</option>
                        <option value="text">text</option>
                    </select>
                    <button type="submit" className={"bg-blue-300 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"}>Add</button>
                </form>
            </div>

            <div>
                <h1 className={"font-extrabold p-2 bg-gray-400"}>Prompt</h1>
                <form action={"/api/v1/prompts"} method={"POST"} autoComplete={"false"} className={"flex flex-col"}>
                    <input type="hidden" name="id" value={prompt.id}/>
                    <label>Name</label>
                    <input type="text" name="name" defaultValue={prompt.name} className={"border shadow p-2"}/>
                    <label>Prompt</label>
                    <textarea name="prompt" defaultValue={prompt.prompt} className={"border shadow p-2"}/>
                    <button type="submit" className={"bg-blue-300 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"}>Submit</button>
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
                    <button type="submit" className={"bg-red-300 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4"}>Delete</button>
                </form>
            </div>

        </div>
);
}