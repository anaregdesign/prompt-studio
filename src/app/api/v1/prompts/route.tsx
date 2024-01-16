import {Prompt} from "@/db/entity/prompt";
import {db} from "@/lib/data";


export async function GET(request: Request): Promise<Response> {
    // not implemented
    return new Response(JSON.stringify({error: "not implemented"}), {status: 501});
}

export async function POST(request: Request): Promise<Response> {
    const prompt: Prompt = await request.json();

    try {
        if (!prompt.id) {
            await db.createPrompt(prompt)
            // 200 OK
            return new Response(JSON.stringify({status: "ok"}), {status: 200});
        } else {
            return new Response(JSON.stringify({error: "id must not be set"}), {status: 400});
        }
    } catch (e) {
        console.error(e);
        return new Response(JSON.stringify({error: e}), {status: 500});
    }
}

export async function PUT(request: Request): Promise<Response> {
    return new Response(JSON.stringify({error: "not implemented"}), {status: 501});
}

export async function DELETE(request: Request): Promise<Response> {
    return new Response(JSON.stringify({error: "not implemented"}), {status: 501});
}