import Link from "next/link";
import {ReactElement} from "react";

export const dynamic = "force-dynamic";

interface PromptArg {
    id: number;
    name: string;
}

export default async function Menu({promptArgs}: { promptArgs: PromptArg[] }): Promise<ReactElement> {
    "use server";
    return (
        <div className={"w-80 h-full bg-white text-black"}>
            <ul>
                <li>
                    <Link
                        href={"/prompts/create"}
                        className={"flex justify-center items-center h-20 border-4 border-blue-300 text-white font-extrabold shadow rounded m-2 p-3 bg-blue-300 hover:bg-blue-700 hover:border-blue-700"}
                    >
                        Create Prompt
                    </Link>
                </li>
                {
                    promptArgs.map(prompt => {
                        return (
                            <li key={prompt.id}>
                                <Link
                                    href={`/prompts/${prompt.id}`}
                                    className={"flex justify-center items-center h-20 border-4 shadow rounded m-2 p-3 hover:bg-gray-300"}
                                >
                                    {prompt.name}
                                </Link>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}
