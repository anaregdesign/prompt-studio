import {db} from "@/lib/data";

export async function GET(request: Request, {params}: { params: { promptId: string } }): Promise<Response> {
    const id = params.promptId;
    const prompt = await db.getPromptById(Number(id));
    return new Response(
        JSON.stringify(
            {prompt}),
        {
            status: 200,
            headers: {
                "Content-Type": "application/json"
            }
        }
    );
}

export async function DELETE(request: Request, {params}: { params: { promptId: string } }): Promise<Response> {
    const id = params.promptId;
    const prompt = await db.getPromptById(Number(id));
    await db.deactivatePrompt(prompt);
    return new Response(
        JSON.stringify(
            {prompt}),
        {
            status: 200,
            headers: {
                "Content-Type": "application/json"
            }
        }
    );
}