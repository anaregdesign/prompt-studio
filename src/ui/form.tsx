"use client";
import {ChangeEvent, ReactElement, useState} from "react";

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
            <form>
                {inputs}
                <h1 className={"font-extrabold mt-5"}>
                    Prompt
                </h1>
                <div className={"p-3 w-full h-40 border"}>
                    {template}
                </div>
            </form>
        </div>
    )


}