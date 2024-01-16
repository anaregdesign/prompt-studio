"use client";

import {ReactElement, useState} from "react";
import {Prompt} from "@/db/entity/prompt";
import {createPrompt, deactivatePrompt} from "@/lib/rest";

interface promptState {
    id: number;
    name: string;
    prompt: string;
}

export function PromptForm({id, name, prompt}: { id: number, name: string, prompt: string }): ReactElement {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [promptState, setPromptState] = useState<promptState>({id: id, name: name, prompt: prompt});

    return (
        <div>
            <h1 className={"font-extrabold p-2 bg-gray-400"}>Prompt</h1>
            <form
                autoComplete={"false"}
                className={"flex flex-col"}
                onSubmit={(event) => {
                    event.preventDefault();
                    setIsLoading(true);
                    const formData = new FormData(event.currentTarget);
                    const requestPrompt = new Prompt();
                    const id = formData.get("id");
                    if (id) {
                        requestPrompt.id = parseInt(id.toString());
                    }
                    const name = formData.get("name");
                    if (name) {
                        requestPrompt.name = name.toString();
                    }
                    const prompt = formData.get("prompt");
                    if (prompt) {
                        requestPrompt.prompt = prompt.toString();
                    }

                    createPrompt(requestPrompt).then((response) => {
                        if (response.status === 200) {
                            response.json().then((body) => {
                                setPromptState({
                                    id: requestPrompt.id,
                                    name: requestPrompt.name,
                                    prompt: requestPrompt.prompt
                                });
                                setIsLoading(false);

                                // redirect to /prompts/[promptId]
                                window.location.href = `/prompts/${requestPrompt.id}`;
                            })
                        }
                    })
                }}
            >
                <input type="hidden" name="id" value={promptState.id}/>
                <label>Name</label>
                <input type="text" name="name" defaultValue={promptState.name} className={"border shadow p-2"}/>
                <label>Prompt</label>
                <textarea name="prompt" defaultValue={promptState.prompt} className={"border shadow p-2"}/>
                <button type="submit"
                        className={"bg-blue-300 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"}>Submit
                </button>
                {isLoading && <p>Loading...</p>}
            </form>


            <div className={"h-full w-full"}>
                <form
                    onSubmit={(event) => {
                        event.preventDefault();
                        setIsLoading(true);
                        deactivatePrompt(promptState.id).then((response) => {
                            if (response.status === 200) {
                                setIsLoading(false);
                                // redirect to /
                                window.location.href = "/";
                            }
                        })
                    }}
                    autoComplete={"false"}
                    className={"flex flex-col"}
                >
                    <button type="submit"
                            className={"bg-red-300 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4"}>Delete
                    </button>
                </form>
            </div>
        </div>
    );
}