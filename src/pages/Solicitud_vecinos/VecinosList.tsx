import { useSolicitudTrabajoStore } from "@/store/storeVecinos"
import VecinosDetails from "./VecinosDetails"
import { useEffect } from "react"
import { useFontaneroStore } from "@/store/storeFontanero"
import { useBombaStore } from "@/store/storeBombas"

export const VecinosList = () => {
    const { solicitudes, fetchSolicitudes } = useSolicitudTrabajoStore()
    const { fetchFontaneros } = useFontaneroStore();
    const { fetchBombas } = useBombaStore();

    useEffect(() => {
        fetchBombas();
        fetchFontaneros();
        fetchSolicitudes();
    }, [fetchBombas, fetchFontaneros, fetchSolicitudes]); // El efecto se ejecuta solo una vez cuando el componente se monta

    return (
        <div className="md:w-1/2 lg:3/5 md:h-full flex-grow overflow-y-scroll
        dark:scrollbar-thin dark:scrollbar-thumb-[#000000] dark:scrollbar-track-[#0a0a0a] 
        dark:scrollbar-thumb-rounded-lg">

            {solicitudes.length ? (
                <>
                    <h2 className="font-black text-3xl text-center">Listado de Solicitudes</h2>
                    {solicitudes.map(solicitud => (
                        <VecinosDetails
                            key={solicitud.id}
                            solicitudes={solicitud} // Cambiado a `solicitud` en lugar de `solicitudes`
                        />
                    ))}
                </>
            ) : (
                <>
                    <h2 className="font-black text-3xl text-center">No hay solicitudes</h2>
                    <p className="text-xl mt-5 mb-10 text-center">
                        Comienza agregando solicitudes {''}
                        <span className="text-blue-500 font-bold">Y aparecerán en este lugar</span>
                    </p>
                </>
            )}
        </div>
    )
}
