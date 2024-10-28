import { CalidadForm } from "./CalidadForm"
import { CalidadList } from "./CalidadList"


export function Calidad_agua() {
    return (
        <div className="container mx-auto mt-5 ">
            <div className="mt-4 md:flex md:h-[calc(100vh-140px)]">
                <CalidadForm />
                <CalidadList />
            </div>
        </div>
    )
}
