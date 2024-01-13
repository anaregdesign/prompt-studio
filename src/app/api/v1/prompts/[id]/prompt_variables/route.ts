import {db} from "@/lib/data";

export async function GET(Request: Request, {params}: { params: { id: string } }): Promise<Response> {
    const id = params.id;
    const prompt = await db.getPromptById(Number(id));
    const promptVariables = await prompt.promptVariables;
    return new Response(JSON.stringify({promptVariables}), {status: 200});
}
