import {db} from "@/lib/data";
import {Prompt} from "@/db/entity/prompt";

export async function GET(request: Request, {params}: { params: { promptVariableId: string } }): Promise<Response> {
    const id: string = params.promptVariableId;
    const promptVariables = await db.getPromptVariableById(Number(id));
    return new Response(JSON.stringify({promptVariables}), {status: 200});
}

export async function POST(request: Request, {params}: {
    params: { promptId: string, promptVariableId: string }
}): Promise<Response> {
    // not implemented
    return new Response(JSON.stringify({status: "ok"}), {status: 501});
}


export async function PUT(request: Request, {params}: {
    params: { promptId: string, promptVariableId: string }
}): Promise<Response> {
    const promptVariable = await request.json();
    promptVariable.id = Number(params.promptVariableId);
    promptVariable.prompt = new Prompt();
    promptVariable.prompt.id = Number(params.promptId);

    try {
        if (await db.isExistingPromptVariable(promptVariable.id)) {
            await db.updatePromptVariable(promptVariable);
            // 200 ok
            return new Response(JSON.stringify({status: "ok"}), {status: 200});
        } else {
            // does not exist
            return new Response(JSON.stringify({error: "does not exist"}), {status: 400});
        }
    } catch (e) {
        console.error(e);
        return new Response(JSON.stringify({error: e}), {status: 500});
    }
}


export async function DELETE(request: Request, {params}: { params: { promptVariableId: string } }): Promise<Response> {
    const id: string = params.promptVariableId;
    await db.deletePromptVariableById(Number(id));
    return new Response(JSON.stringify({status: "ok"}), {status: 200});
}