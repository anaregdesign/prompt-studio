import {PromptVariable} from "@/db/entity/prompt_variable";
import {db} from "@/lib/data";
import {redirect} from "next/navigation";
import {Prompt} from "@/db/entity/prompt";


export async function GET(request: Request): Promise<Response> {
    const url = new URL(request.url);
    const query = new PromptVariable();

    const id = url.searchParams.get('id');
    if (id) {
        query.id = Number(id);
    }

    const name = url.searchParams.get('name');
    if (name) {
        query.name = name.toString();
    }

    const type = url.searchParams.get('type');
    if (type) {
        query.type = type.toString();
    }

    const promptId = url.searchParams.get('promptId');
    if (promptId) {
        query.prompt = new Prompt();
        query.prompt.id = parseInt(promptId.toString());
    }

    const isActive = url.searchParams.get('isActive');
    if (isActive) {
        query.isActive = isActive.toString() === "true";
    }

    const promptVariables = await db.getPromptVariablesByQuery(query);
    return new Response(JSON.stringify(promptVariables), {status: 200});

}


export async function POST(request: Request): Promise<Response> {
    const data: FormData = await request.formData();
    const variable = new PromptVariable();
    try {

        const id = data.get('id');
        if (id) {
            variable.id = Number(id);
        }
        const name = data.get('name');
        if (name) {
            variable.name = name.toString();
        } else {
            return new Response("name is required", {status: 400});
        }

        const type = data.get('type');
        if (type) {
            variable.type = type.toString();
        } else {
            return new Response("type is required", {status: 400});
        }
        const promptId = data.get('promptId');
        if (promptId) {
            variable.prompt = new Prompt();
            variable.prompt.id = parseInt(promptId.toString());
        } else {
            return new Response("promptId is required", {status: 400});
        }


        if (variable.id) {
            await db.updatePromptVariable(variable);
        } else {
            await db.createPromptVariable(variable);
        }
    } catch (e) {
        if (e instanceof Error) {
            return new Response(e.message, {status: 400});
        }
    }

    return redirect(`/prompts/${variable.prompt.id}/edit`)
}

export async function DELETE(request: Request): Promise<Response> {
    const data: FormData = await request.formData();
    const variable = new PromptVariable();
    try {
        const id = data.get('id');
        if (id) {
            variable.id = Number(id);
        } else {
            return new Response("id is required", {status: 400});
        }
        await db.deletePromptVariable(variable);
    } catch (e) {
        if (e instanceof Error) {
            return new Response(e.message, {status: 400});
        }
    }

    return redirect("/")
}