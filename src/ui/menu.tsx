import {db} from "@/lib/data";
import Link from "next/link";
import {Prompt} from "@/db/entity/prompt";
import {GetServerSideProps} from "next";



export default async function Menu({prompts}: {prompts: Prompt[]}) {

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

export const getServerSideProps: GetServerSideProps<{
    prompts: Prompt[]
}> = async () => {
    const prompts = await db.getAllActivePrompts();
    return { props: { prompts: prompts } }
}