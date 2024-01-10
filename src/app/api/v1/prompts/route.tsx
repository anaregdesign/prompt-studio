import {Prompt} from "@/db/entity/prompt";
import {db} from "@/lib/data";
import {redirect} from "next/navigation";

export async function POST(request: Request): Promise<Response> {
    const formData: FormData = await request.formData();
    const newPrompt: Prompt = new Prompt();
    const id = formData.get("id")
    if (id) {
        newPrompt.id = parseInt(id.toString());
    }

    const name = formData.get("name")
    if (name) {
        newPrompt.name = name.toString();
    }

    const prompt = formData.get("prompt")
    if (prompt) {
        newPrompt.prompt = prompt.toString();
    }

    const isActive = formData.get("isActive")
    if (isActive) {
        newPrompt.isActive = isActive.toString() === "true";
    }

    if (newPrompt.id) {
        await db.createPrompt(newPrompt);
    } else {
        await db.updatePrompt(newPrompt);
    }

    return redirect(`/prompts/${newPrompt.id.toString()}`);

}