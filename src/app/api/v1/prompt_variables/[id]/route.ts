import {db} from "@/lib/data";

export async function GET(request: Request, {params}: { params: { id: string } }): Promise<Response> {
    const id = params.id;
    const variable = await db.getPromptVariableById(Number(id));
    return new Response(JSON.stringify({variable}), {status: 200});
}

export async function DELETE(request: Request, {params}: { params: { id: string } }): Promise<Response> {
    const id = params.id;
    await db.deletePromptVariableById(Number(id));
    return new Response(JSON.stringify({}), {status: 200});
}