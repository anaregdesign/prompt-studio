import {ReactElement} from "react";
import {db} from "@/lib/data";
import {Prompt} from "@/db/entity/prompt";
import {redirect} from "next/navigation";

export default async function Page({params}: { params: { id: string } }): Promise<ReactElement> {
    const prompt = new Prompt();
    prompt.name = "Name of prompt";
    prompt.prompt = "Body of prompt";
    await db.createPrompt(prompt);
    const newPrompt = await db.getLatestPrompt()

    return redirect(`/prompts/${newPrompt.id.toString()}/edit`);
}