import {ReactElement} from "react";
import {db} from "@/lib/data";
import {Prompt} from "@/db/entity/prompt";
import {redirect} from "next/navigation";

export const dynamic = "force-dynamic";

export default async function Page({params}: { params: { id: string } }): Promise<ReactElement> {
    "use server";
    const prompt = new Prompt();
    prompt.name = "Name of prompt";
    prompt.prompt = "Body of prompt";
    await db.createPrompt(prompt);
    const newPrompt = await db.getLatestPrompt()

    return redirect(`/prompts/${newPrompt.id.toString()}/edit`);
}