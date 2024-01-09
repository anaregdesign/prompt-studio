
export async function Nav() {
    return (
        <nav className={"w-full h-full"}>
            <ul className={"flex flex-row h-full w-full"}>
                <li className={"flex justify-center items-center h-full p-3 w-80"}>
                    menu1
                </li>
                <li className={"flex justify-center items-center h-full p-3 w-80"}>
                    menu2
                </li>
            </ul>
        </nav>
    )
}