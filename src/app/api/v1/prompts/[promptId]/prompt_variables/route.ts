import {db} from "@/lib/data";
import {Prompt, PromptVariable} from "@/db/entity/prompt";

export async function GET(request: Request, {params}: { params: { promptId: string } }): Promise<Response> {
    const id = params.promptId;
    const prompt = await db.getPromptById(Number(id));
    const promptVariables = await prompt.promptVariables;
    return new Response(JSON.stringify({promptVariables}), {status: 200});
}

export async function POST(request: Request, {params}: { params: { promptId: string } }): Promise<Response> {
    const promptId = params.promptId;
    const promptVariable: PromptVariable = await request.json();
    promptVariable.prompt = new Prompt();
    promptVariable.prompt.id = Number(promptId);

    try {
        if (!promptVariable.id) {
            await db.createPromptVariable(promptVariable);
            // 200 ok
            return new Response(JSON.stringify({status: "ok"}), {status: 200});
        } else {
            // must not be set
            return new Response(JSON.stringify({error: "must not be set"}), {status: 400});
        }
    } catch (e) {
        console.error(e);
        return new Response(JSON.stringify({error: e}), {status: 500});
    }

}

export async function PUT(request: Request, {params}: { params: { promptId: string } }): Promise<Response> {
    // not implemented
    return new Response(JSON.stringify({error: "not implemented"}), {status: 501});
}

export async function DELETE(request: Request, {params}: { params: { promptId: string } }): Promise<Response> {
    // not implemented
    return new Response(JSON.stringify({error: "not implemented"}), {status: 501});
}
