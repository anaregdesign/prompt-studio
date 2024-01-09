"use server";
import {ChatOpenAI} from "@langchain/openai";
import {ReactElement} from "react";

export default async function Chat({prompt}: { prompt: string }): Promise<ReactElement> {
    console.log(prompt)
    const model = new ChatOpenAI({
        // azureOpenAIApiKey: process.env.AZURE_OPENAI_API_KEY?.toString(),
        // azureOpenAIApiInstanceName: process.env.AZURE_OPENAI_API_INSTANCE_NAME?.toString(),
        // azureOpenAIApiDeploymentName: process.env.AZURE_OPENAI_API_DEPLOYMENT_NAME?.toString(),
        // azureOpenAIApiVersion: process.env.AZURE_OPENAI_API_VERSION?.toString(),
        // azureOpenAIBasePath: process.env.AZURE_OPENAI_API_BASE_PATH,
    });

    model.invoke(prompt).then((response) => {
        const s = response.toChunk().content.toString();
    });

    return (
        <div>
        </div>
    );
}