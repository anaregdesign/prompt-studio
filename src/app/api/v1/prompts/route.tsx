import {Prompt} from "@/db/entity/prompt";
import {db} from "@/lib/data";

export async function POST(request: Request): Promise<Response> {
    const prompt: Prompt = await request.json();
    if (prompt.id) {
        await db.createPrompt(prompt);
    } else {
        await db.updatePrompt(prompt);
    }

    return new Response(
        JSON.stringify({status: "ok"}),
        {
            "status": 200,
            "statusText": "OK",
            "headers": {"Content-Type": "application/json"}
        });
}