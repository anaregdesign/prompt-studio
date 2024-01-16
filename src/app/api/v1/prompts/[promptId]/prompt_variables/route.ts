import {db} from "@/lib/data";
import {PromptVariable} from "@/db/entity/prompt_variable";
import {Prompt} from "@/db/entity/prompt";

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
        if (promptVariable.id) {
            await db.updatePromptVariable(promptVariable);
        } else {
            await db.createPromptVariable(promptVariable);
        }
    } catch (e) {
        console.error(e);
        return new Response(JSON.stringify({error: e}), {status: 500});
    }

    return new Response(JSON.stringify(promptVariable), {status: 200});
}

export async function PUT(request: Request, {params}: { params: { promptId: string } }): Promise<Response> {
    const promptId = params.promptId;
    const promptVariable: PromptVariable = await request.json();
    promptVariable.prompt = new Prompt();
    promptVariable.prompt.id = Number(promptId);

    try {
        if (promptVariable.id) {
            await db.updatePromptVariable(promptVariable);
        } else {
            await db.createPromptVariable(promptVariable);
        }
    } catch (e) {
        console.error(e);
        return new Response(JSON.stringify({error: e}), {status: 500});
    }

    return new Response(JSON.stringify(promptVariable), {status: 200});
}

export async function DELETE(request: Request, {params}: { params: { promptId: string } }): Promise<Response> {
    return new Response(JSON.stringify({status: "ok"}), {status: 200});
}
