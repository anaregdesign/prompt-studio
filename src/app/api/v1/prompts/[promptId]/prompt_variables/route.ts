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
    const id = params.promptId;
    const prompt: Prompt = await db.getPromptById(Number(id));
    const promptVariable: PromptVariable = await request.json();
    promptVariable.prompt = prompt;
    await db.promptVariable.save(promptVariable);
    return new Response(JSON.stringify(promptVariable), {status: 200});
}

