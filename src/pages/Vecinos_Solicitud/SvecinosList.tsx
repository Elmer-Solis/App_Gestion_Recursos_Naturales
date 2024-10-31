

import { useEffect, useState } from "react";
import { useFontaneroStore } from "@/store/storeFontanero";
import { useBombaStore } from "@/store/storeBombas";
import { Input } from "@/components/ui/input";
import { SvecinosDetail } from "./SvecinosDetail";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { useSolicitudstore } from "@/store/storeSolicitud";



export function SvecinosList() {

    const { solicitudes, fetchSolicitudes } = useSolicitudstore();
    const { fetchFontaneros } = useFontaneroStore();
    const { fetchBombas } = useBombaStore();

    const [searchExpediente, setSearchExpediente] = useState('');
    const [searchNombre, setSearchNombre] = useState('');
    const [searchZona, setSearchZona] = useState<null | string>(null); // Estado para zona, inicialmente null


    const filteredSolicitudes = solicitudes.filter((solicitud) =>
        solicitud.numero_expediente.toString().includes(searchExpediente) &&
        solicitud.nombre_solicitante.toLowerCase().includes(searchNombre.toLowerCase()) &&
        (searchZona === null || solicitud.zona === searchZona) // Filtrar por zona
    );

    useEffect(() => {
        fetchBombas();
        fetchFontaneros();
        fetchSolicitudes();
    }, [fetchBombas, fetchFontaneros, fetchSolicitudes]);

    return (
        <div className="mt-4 md:w-2/5 lg:w-2/5 md:h-full flex-grow">
            <div className="flex flex-col md:flex-row mt-14 md:mt-0 mb-4 md:mb-0 justify-center gap-4">

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
                <Select
                    onValueChange={(value) => setSearchZona(value === "todas" ? null : value)}
                    value={searchZona || "todas"}
                >
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Elige una zona" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="todas">Todas las zonas</SelectItem>
                        <SelectItem value="zona_1">Zona 1</SelectItem>
                        <SelectItem value="zona_2">Zona 2</SelectItem>
                        <SelectItem value="zona_3">Zona 3</SelectItem>
                        <SelectItem value="zona_4">Zona 4</SelectItem>
                        <SelectItem value="santa_rita">Santa Rita</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div
                className=" h-full overflow-y-scroll
                dark:scrollbar-thin dark:scrollbar-thumb-[#000000] dark:scrollbar-track-[#0a0a0a] 
                dark:scrollbar-thumb-rounded-lg"

            >
                {filteredSolicitudes.length ? (
                    <>
                        {filteredSolicitudes.map((solicitud) => (
                            <SvecinosDetail
                                key={solicitud.id}
                                solicitudes={solicitud}
                            />
                        ))}
                    </>
                ) : (
                    <>
                        <h2 className="font-black text-3xl text-center mt-6 md:mt-0">
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
    )
}
