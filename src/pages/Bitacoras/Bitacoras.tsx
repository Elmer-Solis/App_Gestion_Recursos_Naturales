import { BitacoraForm } from "./BitacoraForm"
import { BitacoraList } from "./BitacoraList"


export function Bitacoras() {
    return (
        <div className="container mx-auto mt-4 ">

            <h1 className="font-black text-5xl text-center md:w-2/3 md:mx-auto   md:pr-[10%]  ">
                Bitacoras {''}
            </h1>

            <div className="mt-6 md:flex">
                <BitacoraForm />
                <BitacoraList />
            </div>
        </div>
    )
}
