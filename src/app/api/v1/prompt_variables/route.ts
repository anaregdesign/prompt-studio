import {PromptVariable} from "@/db/entity/prompt_variable";
import {db} from "@/lib/data";
import {redirect} from "next/navigation";
import {Prompt} from "@/db/entity/prompt";
import * as url from "url";


export async function POST(request: Request): Promise<Response> {
    const data: any = await request.json();
    const variable = new PromptVariable();
    try {

        if (data.id) {
            variable.id = Number(data.id);
        }
        if (data.name) {
            variable.name = data.name.toString();
        } else {
            return new Response("name is required", {status: 400});
        }

        if (data.type) {
            variable.type = data.type.toString();
        } else {
            return new Response("type is required", {status: 400});
        }
        if (data.prompt.id) {
            variable.prompt = new Prompt();
            variable.prompt.id = data.prompt.id
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
            console.error(e.message)
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