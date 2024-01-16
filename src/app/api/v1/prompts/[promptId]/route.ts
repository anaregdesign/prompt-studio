import {db} from "@/lib/data";
import {Prompt} from "@/db/entity/prompt";

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

export async function POST(request: Request, {params}: { params: { promptId: string } }): Promise<Response> {
    // not implemented
    return new Response(JSON.stringify({error: "not implemented"}), {status: 501});
}


export async function PUT(request: Request, {params}: { params: { promptId: string } }): Promise<Response> {
    const promptId = Number(params.promptId);
    const prompt: Prompt = await request.json();

    try {
        if (await db.isExistingPrompt(promptId)) {
            await db.updatePrompt(prompt);
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