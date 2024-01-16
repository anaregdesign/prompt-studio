import {Prompt} from "@/db/entity/prompt";
import {PromptVariable} from "@/db/entity/prompt_variable";


export async function createPrompt(prompt: Prompt): Promise<Response> {
    return await fetch('/api/v1/prompts', {
        method: 'POST',
        body: JSON.stringify(prompt),
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

export async function updatePrompt(prompt: Prompt): Promise<Response> {
    return await fetch(`/api/v1/prompts/${prompt.id}`, {
        method: 'PUT',
        body: JSON.stringify(prompt),
        headers: {
            'Content-Type': 'application/json'
        }
    });

}

export async function deactivatePrompt(promptId: number): Promise<Response> {
    return fetch(`/api/v1/prompts/${promptId}`, {
        method: 'DELETE'
    });
}

export async function createPromptVariable(promptId: number, promptVariable: PromptVariable): Promise<Response> {
    return await fetch(`/api/v1/prompts/${promptId}/prompt_variables`, {
        method: 'POST',
        body: JSON.stringify(promptVariable),
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

export async function getPromptVariables(promptId: number): Promise<Response> {
    return fetch(`/api/v1/prompts/${promptId}/prompt_variables`);
}

export async function deletePromptVariable(promptId: number, promptVariableId: number): Promise<Response> {
    return fetch(`/api/v1/prompts/${promptId}/prompt_variables/${promptVariableId}`, {
        method: 'DELETE'
    });
}