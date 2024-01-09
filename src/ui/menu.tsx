import {db} from "@/lib/data";
import Link from "next/link";
import {Prompt} from "@/db/entity/prompt";

export default async function Menu() {
    const prompts: Prompt[] = await db.getAllPrompts();

    return (
        <div className={"w-80 h-full bg-black text-white"}>
            <ul>
                {
                    prompts.map(prompt => {
                        return (
                            <li key={prompt.id}>
                                <Link
                                    href={`/prompts/${prompt.id}`}
                                    className={"flex justify-center items-center w-full h-20 hover:bg-gray-300"}
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