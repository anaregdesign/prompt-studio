import {db} from "@/lib/data";

export async function GET(request: Request, {params}: { params: { id: string } }): Promise<Response> {
    const id = params.id;
    const prompt = await db.getPromptById(Number(id));
    return new Response(JSON.stringify({prompt}), {status: 200});
}