import {ReactElement} from "react";

export default async function Page({params}: {params: {id: string}}): Promise<ReactElement> {
    return (
        <>{params.id}</>
    );
}