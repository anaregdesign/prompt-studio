import {PromptVariable} from "@/db/entity/prompt_variable";
import {db} from "@/lib/data";


export async function POST(request: Request): Promise<Response> {
    const variable: PromptVariable = await request.json();
    try {
        if (variable.id) {
            await db.updatePromptVariable(variable);
        } else {
            await db.createPromptVariable(variable);
        }
    } catch (e) {
        if (e instanceof Error) {
            return new Response(e.message, {status: 500});
        }
    }
    return new Response(
        JSON.stringify(variable),
        {
            status: 200,
            headers: {
                "Content-Type": "application/json"
            }
        }
    );
}
