"use client";

import {FormEvent} from "react";

export const dynamic = "force-dynamic";
export function DeleteVariablesButton({id}: {id: number}) {
    return (
        <form onSubmit={(event: FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const data = new FormData(event.currentTarget);
            if (id) {
                fetch(
                    `/api/v1/prompt_variables`,
                    {
                        method: "DELETE",
                        body: data
                    }).then(response => {
                    if (response.ok) {
                        window.location.reload();
                    }
                })
            }

        }}>
            <input type="hidden" name={"id"} value={id}/>
            <button type={"submit"}
                    className={"border shadow rounded flex justify-center items-center p-2 bg-blue-300"}>Delete
            </button>
        </form>
    )
}