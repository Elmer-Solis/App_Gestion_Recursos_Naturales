import { useSolicitudTrabajoStore } from "@/store/storeVecinos"
import VecinosDetails from "./VecinosDetails"
import { useEffect } from "react"

export const VecinosList = () => {
    const { solicitudes, fetchSolicitudes } = useSolicitudTrabajoStore()
    useEffect(() => {
        fetchSolicitudes();
    }, [fetchSolicitudes]); // El efecto se ejecuta solo una vez cuando el componente se monta

    return (
        <div className="md:w-1/2 lg:3/5 md:h-full flex-grow overflow-y-scroll
        dark:scrollbar-thin dark:scrollbar-thumb-[#000000] dark:scrollbar-track-[#0a0a0a] 
        dark:scrollbar-thumb-rounded-lg">

            {solicitudes.length ? (
                <>
                    <h2 className="font-black text-3xl text-center">Listado de Solicitudes</h2>
                    <p className="text-xl mt-5 mb-10 text-center">
                        Administra tus {''}
                        <span className="text-blue-500 font-bold">Solicitudes</span>
                    </p>
                    {solicitudes.map(solicitud => (
                        <VecinosDetails
                            key={solicitud.id}
                            solicitud={solicitud}
                        />
                    ))}
                </>
            ) : (
                <>
                    <h2 className="font-black text-3xl text-center">No hay solicitudes</h2>
                    <p className="text-xl mt-5 mb-10 text-center">
                        Comienza agregando soliciutes {''}
                        <span className="text-blue-500 font-bold">Y apareceran en este lugar</span>
                    </p>
                </>
            )}
        </div>
    )
}
