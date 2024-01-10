import {ChatOpenAI} from "@langchain/openai";

export async function POST(request: Request): Promise<Response> {
    const data: FormData = await request.formData();
    const templated = data.get('templated');
    if (templated) {
        const model = new ChatOpenAI();
        const response = await model.invoke(templated.toString());
        return new Response(JSON.stringify(response), {status: 200});
    } else {
        return new Response("templated is required", {status: 400});
    }
}