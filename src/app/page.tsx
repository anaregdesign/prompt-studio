import {ReactElement} from "react";
import Menu from "@/ui/menu";
import {db} from "@/lib/data";

export const dynamic = "force-dynamic";
export default async function Home(): Promise<ReactElement> {
    "use server";

    const promptArgs = (await db.getAllActivePrompts()).map(prompt => {
        return {
            id: prompt.id,
            name: prompt.name
        }

    });
    return (
        <div className={"max-w-md:w-full lg:w-80"}>
            <Menu promptArgs={promptArgs}/>
        </div>

    )
}
