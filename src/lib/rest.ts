import {Prompt} from "@/db/entity/prompt";
import {PromptVariable} from "@/db/entity/prompt_variable";


async function postPrompt(prompt: Prompt): Promise<Prompt> {
    const response = await fetch('/api/v1/prompts', {
        method: 'POST',
        body: JSON.stringify(prompt),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return await response.json();
}

async function postPromptVariable(promptVariable: PromptVariable): Promise<PromptVariable> {
    const response = await fetch('/api/v1/prompt_variables', {
        method: 'POST',
        body: JSON.stringify(promptVariable),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return await response.json();
}

async function getPromptVariablesOfPromptId(promptId: number): Promise<PromptVariable[]> {
    const response = await fetch('/api/v1/prompts/' + promptId + '/prompt_variables');
    return await response.json();
}
