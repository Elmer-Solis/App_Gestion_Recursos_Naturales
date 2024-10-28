import { BitacoraForm } from "./BitacoraForm"
import { BitacoraList } from "./BitacoraList"


export function Bitacoras() {
    return (
        <div className="container mx-auto mt-5 ">

            <div className="mt-4 md:flex md:h-[calc(100vh-140px)]">
                <BitacoraForm />
                <BitacoraList />
            </div>
        </div>
    )
}
