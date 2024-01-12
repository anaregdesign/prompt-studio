import {Prompt} from "@/db/entity/prompt";
import {PromptVariable} from "@/db/entity/prompt_variable";


export async function postPrompt(prompt: Prompt): Promise<Response> {
    return await fetch('/api/v1/prompts', {
        method: 'POST',
        body: JSON.stringify(prompt),
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

export async function postPromptVariable(promptVariable: PromptVariable): Promise<Response> {
    return await fetch('/api/v1/prompt_variables', {
        method: 'POST',
        body: JSON.stringify(promptVariable),
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

export async function getPromptVariablesOfPromptId(promptId: number): Promise<Response> {
    return fetch('/api/v1/prompts/' + promptId + '/prompt_variables');
}
