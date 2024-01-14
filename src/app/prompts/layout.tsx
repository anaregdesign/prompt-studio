import type {Metadata} from 'next'
import "@/app/globals.css"
import Link from "next/link";
import Menu from "@/ui/menu";
import {db} from "@/lib/data";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
    title: 'Prompt Studio',
    description: 'Prompt Sharing Service',
}

export default async function RootLayout({
                                             children,
                                         }: {
    children: React.ReactNode
}) {
    "use server";
    const prompts = await db.getAllActivePrompts();
    const promptArgs = prompts.map(prompt => {
        return {
            id: prompt.id,
            name: prompt.name
        }
    });
    return (
        <html lang="en">
        <body>
        <div className={"w-screen h-screen"}>
            <div className={"flex flex-row w-full h-20 bg-black text-white"}>
                {/* title */}
                <Link
                    href={"/"}
                    className={"flex justify-center items-center font-extrabold p-3 mr-10 w-80 hover:bg-gray-700"}
                >
                    Prompt Studio
                </Link>

                {/* navication */}
                <div className={"w-full h-full"}>
                    {/*<Nav/>*/}
                </div>
            </div>
            <div className={"flex flex-row w-full h-full bg-white"}>
                <Menu promptArgs={promptArgs}/>
                <div className={"w-full"}>
                    {children}
                </div>
            </div>
        </div>
        </body>
        </html>
    )
}
