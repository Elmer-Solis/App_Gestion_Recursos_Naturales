import { useSolicitudTrabajoStore } from "@/store/storeVecinos"
import VecinosDetails from "./VecinosDetails"
import { useEffect, useState } from "react"
import { useFontaneroStore } from "@/store/storeFontanero"
import { useBombaStore } from "@/store/storeBombas"
import { Input } from "@/components/ui/input";

export const VecinosList = () => {
    const { solicitudes, fetchSolicitudes } = useSolicitudTrabajoStore()
    const { fetchFontaneros } = useFontaneroStore();
    const { fetchBombas } = useBombaStore();

    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetchBombas();
        fetchFontaneros();
        fetchSolicitudes();
    }, [fetchBombas, fetchFontaneros, fetchSolicitudes]); // El efecto se ejecuta solo una vez cuando el componente se monta

    // Filter solicitudes based on the search query
    const filteredSolicitudes = solicitudes.filter((solicitud) =>
        solicitud.numero_expediente.toString().includes(searchQuery)
    );

    return (
        <div className="md:w-1/2 lg:3/5 md:h-full flex-grow">
            <Input
                type="text"
                placeholder="Buscar expediente"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)} // Update search query state
                className="mb-4"
            />
            <div
                className="mt-4 h-full overflow-y-scroll
                dark:scrollbar-thin dark:scrollbar-thumb-[#000000] dark:scrollbar-track-[#0a0a0a] 
                dark:scrollbar-thumb-rounded-lg"
                style={{ maxHeight: "calc(100vh - 100px)" }}
            >
                {filteredSolicitudes.length ? (
                    <>
                        {filteredSolicitudes.map((solicitud) => (
                            <VecinosDetails
                                key={solicitud.id}
                                solicitudes={solicitud}
                            />
                        ))}
                    </>
                ) : (
                    <>
                        <h2 className="font-black text-3xl text-center">
                            No hay solicitudes
                        </h2>
                        <p className="text-xl mt-5 mb-10 text-center">
                            Comienza agregando solicitudes {""}
                            <span className="text-blue-500 font-bold">
                                Y aparecerán en este lugar
                            </span>
                        </p>
                    </>
                )}
            </div>
        </div>
    );
}
