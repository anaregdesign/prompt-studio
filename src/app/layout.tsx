import type {Metadata} from 'next'
import './globals.css'
import Link from "next/link";
import {Nav} from "@/ui/nav";


export const metadata: Metadata = {
    title: 'Prompt Studio',
    description: 'Prompt Sharing Service',
}

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
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
                    <Nav/>
                </div>
            </div>
            <div className={"flex flex-row w-full h-full"}>
                <div className={"w-80 h-full bg-gray-400"}>
                    <h1>category</h1>
                    <ul>
                        <li>
                            <Link
                                href={"/"}
                                className={"flex justify-center items-center w-full h-20 hover:bg-gray-300"}
                            >
                                category1
                            </Link>
                        </li>
                        <li>
                            <Link
                                href={"/"}
                                className={"flex justify-center items-center w-full h-20 hover:bg-gray-300"}
                            >
                                category1
                            </Link>
                        </li>
                    </ul>
                </div>
                <div>
                    {children}
                </div>
            </div>
        </div>
        </body>
        </html>
    )
}
