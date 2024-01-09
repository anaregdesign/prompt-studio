import {ReactElement} from "react";
import {db} from "@/lib/data";

export default async function Page({params}: { params: { id: string } }): Promise<ReactElement> {
    const prompt = await db.getPromptById(parseInt(params.id));
    const variables = await prompt.getActivePromptVariables();

    return (
        <div>
            <div>
                <h1 className={"font-extrabold p-2 bg-gray-400"}>parameters</h1>
                <table className={"border"}>
                    <thead>
                    <tr className={"border"}>
                        <th>Variable Name</th>
                        <th>Variable Type</th>
                    </tr>
                    </thead>
                    <tbody>
                    {variables.map(variable => {
                        return (
                            <tr key={variable.name}>
                                <td>{variable.name}</td>
                                <td>{variable.type}</td>
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
            </div>

            <div>
                <h1 className={"font-extrabold p-2 bg-gray-400"}>Prompt</h1>
                <form action={"/api/v1/prompts"} method={"POST"} className={"flex flex-col"}>
                    <input type="hidden" name="id" value={prompt.id}/>
                    <label>Name</label>
                    <input type="text" name="name" defaultValue={prompt.name} className={"border shadow p-2"}/>
                    <label>Prompt</label>
                    <textarea name="prompt" defaultValue={prompt.prompt} className={"border shadow p-2"}/>
                    <button type="submit" className={"border shadow bg-blue-300"}>Submit</button>
                </form>
            </div>

        </div>
    );
}