import {Prompt} from "@/db/entity/prompt";
import {db} from "@/lib/data";


export async function GET(request: Request): Promise<Response> {
    return new Response("not implemented", {"status": 501, "statusText": "Not Implemented"});
}

export async function POST(request: Request): Promise<Response> {
    const prompt: Prompt = await request.json();
    if (prompt.id) {
        await db.createPrompt(prompt);
    } else {
        await db.updatePrompt(prompt);
    }

    return new Response(
        JSON.stringify({status: "ok"}),
        {
            "status": 200,
            "statusText": "OK",
            "headers": {"Content-Type": "application/json"}
        });
}

export async function PUT(request: Request): Promise<Response> {
    return new Response("not implemented", {"status": 501, "statusText": "Not Implemented"});
}

export async function DELETE(request: Request): Promise<Response> {
    return new Response("not implemented", {"status": 501, "statusText": "Not Implemented"});
}