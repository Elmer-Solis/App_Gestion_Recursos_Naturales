import { useBitacoraTomasStore } from "@/store/storeBitacoras";
import { useFontaneroStore } from "@/store/storeFontanero";
import { useEffect } from "react";
import { BitacoraDetails } from "./BitacoraDetails";

export function BitacoraList() {

    const { fetchFontaneros } = useFontaneroStore();
    const { bitacoras, fetchBitacoras } = useBitacoraTomasStore();

    useEffect(() => {
        fetchFontaneros();
        fetchBitacoras();
    }, [fetchFontaneros, fetchBitacoras]);

    return (
        <div className=" md:w-3/5 lg:w:3/5 md:h-full  overflow-y-scroll
        dark:scrollbar-thin dark:scrollbar-thumb-[#000000] dark:scrollbar-track-[#0a0a0a] 
        dark:scrollbar-thumb-rounded-lg">
            {bitacoras.length ? (
                <>
                    <h2 className="font-black text-3xl text-center mt-6 md:mt-0">Listado de Bitacoras</h2>
                    <p className="text-xl mt-5 mb-10 text-center">
                        Administra tus {''}
                        <span className="text-blue-500 font-bold">Bitacoras Disponibles</span>
                    </p>
                    {bitacoras.map(fontanero => (
                        <BitacoraDetails
                            key={fontanero.id}
                            bitacoras={fontanero}
                        />
                    ))}
                </>
            ) : (
                <>
                    <h2 className="font-black text-3xl text-center mt-6 md:mt-0">No hay Bitacoras</h2>
                    <p className="text-xl mt-5 mb-10 text-center">
                        Comienza agregando Bitacoras {''}
                        <span className="text-blue-500 font-bold">Y apareceran en este lugar</span>
                    </p>
                </>
            )}
        </div>
    )
}
