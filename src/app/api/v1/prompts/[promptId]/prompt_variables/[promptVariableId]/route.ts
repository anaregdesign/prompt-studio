import {db} from "@/lib/data";

export async function GET(request: Request, {params}: { params: { promptVariableId: string } }): Promise<Response> {
    const id: string = params.promptVariableId;
    const promptVariables = await db.getPromptVariableById(Number(id));
    return new Response(JSON.stringify({promptVariables}), {status: 200});
}

export async function DELETE(request: Request, {params}: { params: { promptVariableId: string } }): Promise<Response> {
    const id: string = params.promptVariableId;
    await db.deletePromptVariableById(Number(id));
    return new Response(JSON.stringify({status: "ok"}), {status: 200});
}