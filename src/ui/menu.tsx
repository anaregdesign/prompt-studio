"use client";

import Link from "next/link";
import {ReactElement, useState} from "react";

export const dynamic = "force-dynamic";

interface Prompt {
    id: number;
    name: string;
}

export default function Menu({initialPromptArgs}: { initialPromptArgs: Prompt[] }): ReactElement {
    const initialPrompts: Prompt[] = initialPromptArgs.map(prompt => {
        const p: Prompt = {
            id: prompt.id,
            name: prompt.name
        }
        return p;
    });
    const [prompts, setPrompts] = useState<Prompt[]>(initialPrompts);

    return (
        <div className={"w-80 h-full bg-white text-black"}>
            <ul>
                <Link
                    href={"/prompts/create"}
                    className={"flex justify-center items-center h-20 border-4 border-blue-300 text-white font-extrabold shadow rounded m-2 p-3 bg-blue-300 hover:bg-blue-700 hover:border-blue-700"}
                >
                    Create Prompt
                </Link>
                {
                    prompts.map(prompt => {
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

// export const getServerSideProps: GetServerSideProps<{
//     prompts: Prompt[]
// }> = async () => {
//     const prompts = await db.getAllActivePrompts();
//     return { props: { prompts: prompts } }
// }