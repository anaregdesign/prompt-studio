import {Prompt} from "@/db/entity/prompt";
import {db} from "@/lib/data";
import {redirect} from "next/navigation";

export async function POST(request: Request): Promise<Response> {
    try {
        const formData: FormData = await request.formData();
        const newPrompt: Prompt = new Prompt();

        newPrompt.id = parseInt(formData.get("id")?.toString() ?? "");
        const oldPrompt: Prompt = await db.getPromptById(newPrompt.id)
        newPrompt.name = formData.get("name")?.toString() ?? oldPrompt.name;
        newPrompt.prompt = formData.get("prompt")?.toString() ?? oldPrompt.prompt;
        await db.updatePrompt(newPrompt);

        return redirect(`/prompts/${newPrompt.id.toString()}`);
    } catch (e) {
        console.log(e)
        return new Response("Internal Server Error", {status: 500})
    }

}