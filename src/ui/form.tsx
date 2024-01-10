"use client";
import {ChangeEvent, FormEvent, ReactElement, useState} from "react";

function getInput(variable: State, handler: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void): ReactElement {
    switch (variable.type) {
        case "string":
            return (
                <div key={variable.name} className={"flex flex-row w-full m-3"}>
                    <div className={"w-20 m-1 font-extrabold flex justify-end"}>
                        <label className={"p-2"}>{variable.name}</label>
                    </div>
                    <input
                        className={"p-3 w-80 border shadow rounded"}
                        type="text"
                        onChange={handler}
                        name={variable.name}
                        defaultValue={variable.type}
                    />
                </div>
            )

        case "number":
            return (
                <div key={variable.name} className={"flex flex-row w-full m-3"}>
                    <div className={"w-20 m-1 font-extrabold flex justify-end"}>
                        <label className={"p-2"}>{variable.name}</label>
                    </div>
                    <input
                        className={"p-3 w-80 border shadow rounded"}
                        type="number"
                        onChange={handler}
                        name={variable.name}
                        defaultValue={1}
                    />
                </div>
            )

        case "text":
            return (
                <div key={variable.name} className={"w-full"}>
                    <label className={"p-3"}>{variable.name}</label>
                    <textarea
                        className={"p-3 border shadow rounded"}
                        onChange={handler}
                        name={variable.name}
                        defaultValue={variable.type}
                    />
                </div>
            )
    }
    return <></>
}

export interface State {
    name: string
    type: string
    value: string
}

export function Form({prompt, variables}: { prompt: string, variables: State[] }): ReactElement {
    const [template, setTemplate] = useState<string>(prompt)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [res, setRes] = useState<string>("")
    const k: number = variables.length

    const [states, setStates] = useState<State[]>(variables)

    const inputs: ReactElement[] = variables.map((variable, index) => {
        const handler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            setStates(prev => {
                const next = prev.map(e => e)
                next[index] = {name: prev[index].name, type: prev[index].type, value: e.target.value};

                setTemplate(template => {
                    let nextTemplate = prompt;
                    for (let i = 0; i < k; i++) {
                        nextTemplate = nextTemplate.replace(`{{${next[i].name}}}`, next[i].value);
                    }
                    return nextTemplate;
                });
                return next
            })
        }
        return getInput(variable, handler)
    })

    return (
        <div className={"w-full"}>
            <h1 className={"font-extrabold p-2 bg-gray-400"}>Parameters</h1>
            <form onSubmit={(event: FormEvent<HTMLFormElement>) => {
                event.preventDefault();
                setIsLoading(true);


                const formData = new FormData(event.currentTarget);
                const url = "/api/v1/chat/completion";
                fetch(url, {
                    method: "POST",
                    body: formData
                }).then(response => {
                        if (response.ok) {
                            response.json().then(json => {
                                console.log(json.kwargs)
                                setRes(json.kwargs.content);
                            })
                        }
                    }
                ).catch(error => {
                    console.error(error)
                }).finally(() => {
                    setIsLoading(false)
                })
            }}>
                {inputs}
                <h1 className={"font-extrabold p-2 bg-gray-400"}>Prompt</h1>

                <input type={"hidden"} name={"templated"} value={template}/>

                <textarea
                    disabled={true}
                    className={"p-3 border shadow rounded w-full h-80"}
                    defaultValue={template}
                />


                <div className={"w-full h-20 flex flex-col justify-center items-center"}>
                    <button type={"submit"}
                            className={"bg-blue-300 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"}>
                        ↓Send↓
                    </button>
                    {isLoading && <p>Loading...</p>}
                </div>
                <h1 className={"font-extrabold p-2 bg-gray-400"}>Response</h1>

                <div className={"p-3 w-full h-40 border"}>
                    {res}
                </div>
            </form>
        </div>
    )
        ;
}