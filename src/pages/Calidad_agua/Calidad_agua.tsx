import { CalidadForm } from "./CalidadForm"
import { CalidadList } from "./CalidadList"


export function Calidad_agua() {
    return (
        <div className="container mx-auto mt-4 ">
            <h1 className="font-black text-5xl text-center md:w-2/3 md:mx-auto  md:pr-[10%]  ">
                Calidad Del Agua{''}
            </h1>

            <div className="mt-6 md:flex md:h-[calc(100vh-135px)]">
                <CalidadForm />
                <CalidadList />
            </div>
        </div>
    )
}
