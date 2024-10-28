import { useBombaStore } from "@/store/storeBombas";
import { useEffect } from "react";
import { CalidadDetails } from "./CalidadDetails";
import { useCalidadAguaStore } from "@/store/storeCalidadAgua";

export function CalidadList() {
    const { fetchBombas } = useBombaStore();
    const { registrosCalidad, fetchCalidad } = useCalidadAguaStore();


    useEffect(() => {
        fetchBombas();
        fetchCalidad();
    }, [fetchBombas, fetchCalidad]);

    return (
        <div className=" md:w-1/2 lg:w-3/5 md:h-full flex-grow overflow-y-scroll
        dark:scrollbar-thin dark:scrollbar-thumb-[#000000] dark:scrollbar-track-[#0a0a0a] 
        dark:scrollbar-thumb-rounded-lg">
            {registrosCalidad.length ? (
                <>
                    <h2 className="font-black text-3xl text-center">Listado de Calidad</h2>
                    <p className="text-xl mt-5 mb-10 text-center">
                        Administra tus {''}
                        <span className="text-blue-500 font-bold">Procesos</span>
                    </p>
                    {registrosCalidad.map(calidad => (
                        <CalidadDetails
                            key={calidad.id}
                            calidad={calidad}
                        />
                    ))}
                </>
            ) : (
                <>
                    <h2 className="font-black text-3xl text-center">No hay Registro</h2>
                    <p className="text-xl mt-5 mb-10 text-center">
                        Comienza agregando  {''}
                        <span className="text-blue-500 font-bold">Y apareceran en este lugar</span>
                    </p>
                </>
            )}
        </div>
    )
}
