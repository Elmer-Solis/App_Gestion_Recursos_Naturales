import { useFontaneroStore } from "@/store/storeFontanero";
import FontaneroDetails from "./FontaneroDetails";
import { useEffect } from "react";

export default function FontaneroList() {

    const fontaneros = useFontaneroStore((state) => state.fontaneros);
    const fetchBombas = useFontaneroStore((state) => state.fetchFontaneros);

    // Llamamos a fetchBombas cuando el componente se monta
    useEffect(() => {
        fetchBombas();
    }, [fetchBombas]); // El efecto se ejecuta solo una vez cuando el componente se monta

    return (
        <div className="md:w-1/2 lg:3/5 md:h-full flex-grow overflow-y-scroll
         dark:scrollbar-thin dark:scrollbar-thumb-[#000000] dark:scrollbar-track-[#0a0a0a] 
         dark:scrollbar-thumb-rounded-lg">
            {fontaneros.length ? (
                <>
                    <h2 className="font-black text-3xl text-center">Listado de Fontaneros</h2>
                    <p className="text-xl mt-5 mb-10 text-center">
                        Administra tus {''}
                        <span className="text-blue-500 font-bold">Fontaneros Disponibles</span>
                    </p>
                    {fontaneros.map(fontanero => (
                        <FontaneroDetails
                            key={fontanero.id}
                            fontanero={fontanero}
                        />
                    ))}
                </>
            ) : (
                <>
                    <h2 className="font-black text-3xl text-center">No hay Fontaneros</h2>
                    <p className="text-xl mt-5 mb-10 text-center">
                        Comienza agregando Fontaneros {''}
                        <span className="text-blue-500 font-bold">Y apareceran en este lugar</span>
                    </p>
                </>
            )}
        </div>
    )
}
