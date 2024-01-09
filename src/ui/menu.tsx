import {db} from "@/lib/data";
import Link from "next/link";
import {Prompt} from "@/db/entity/prompt";

export default async function Menu() {
    const prompts: Prompt[] = await db.getAllPrompts();

    return (
        <div className={"w-80 h-full bg-white text-black"}>
            <ul>
                <Link
                    href={`/prompts/create`}
                    className={"flex justify-center items-center h-20 border-4 text-white font-extrabold shadow rounded m-2 p-3 bg-blue-300 hover:bg-blue-700"}
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