import { PermisosForm } from "./PermisosForm"
import { PermisosList } from "./PermisosList"

export function Permisos() {
    return (
        <div className="container mx-auto mt-4  ">
            <h1 className="font-black text-5xl text-center md:w-2/3 md:mx-auto md:pr-[10%]">
                Permisos {''}
            </h1>

            <div className="mt-6 md:flex md:h-[calc(100vh-135px)]">
                <PermisosForm />
                <PermisosList />
            </div>
        </div>
    )
}
