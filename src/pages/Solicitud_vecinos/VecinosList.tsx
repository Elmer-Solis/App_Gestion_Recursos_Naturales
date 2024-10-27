import { useSolicitudTrabajoStore } from "@/store/storeVecinos";
import VecinosDetails from "./VecinosDetails";
import { useEffect, useState } from "react";
import { useFontaneroStore } from "@/store/storeFontanero";
import { useBombaStore } from "@/store/storeBombas";
import { Input } from "@/components/ui/input";

export const VecinosList = () => {
    const { solicitudes, fetchSolicitudes } = useSolicitudTrabajoStore();
    const { fetchFontaneros } = useFontaneroStore();
    const { fetchBombas } = useBombaStore();

    const [searchExpediente, setSearchExpediente] = useState('');
    const [searchNombre, setSearchNombre] = useState('');

    useEffect(() => {
        fetchBombas();
        fetchFontaneros();
        fetchSolicitudes();
    }, [fetchBombas, fetchFontaneros, fetchSolicitudes]);

    // Filter solicitudes based on the search queries
    const filteredSolicitudes = solicitudes.filter((solicitud) =>
        solicitud.numero_expediente.toString().includes(searchExpediente) &&
        solicitud.nombre_solicitante.toLowerCase().includes(searchNombre.toLowerCase())
    );

    return (
        <div className="md:w-2/5 lg:w-2/5 md:h-full flex-grow">
            <div className="flex justify-center gap-4">
                <Input
                    type="text"
                    placeholder="Buscar expediente"
                    value={searchExpediente}
                    onChange={(e) => setSearchExpediente(e.target.value)} // Update expediente search query state
                    className="mb-4"
                />
                <Input
                    type="text"
                    placeholder="Buscar nombre"
                    value={searchNombre}
                    onChange={(e) => setSearchNombre(e.target.value)} // Update nombre search query state
                    className="mb-4"
                />
            </div>

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
};
