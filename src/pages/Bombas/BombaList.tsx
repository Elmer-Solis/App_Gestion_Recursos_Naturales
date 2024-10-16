
import { useBombaStore } from "@/store/storeBombas";
import BombaDetails from "./BombaDetails";
import { useEffect } from "react";


export default function BombaList() {

    const bombas = useBombaStore((state) => state.bombas);
    const fetchBombas = useBombaStore((state) => state.fetchBombas);

    // Llamamos a fetchBombas cuando el componente se monta
    useEffect(() => {
        fetchBombas();
    }, [fetchBombas]); // El efecto se ejecuta solo una vez cuando el componente se monta


    return (
        <div className="md:w-1/2 lg:3/5 md:h-full flex-grow overflow-y-scroll
        dark:scrollbar-thin dark:scrollbar-thumb-[#000000] dark:scrollbar-track-[#0a0a0a] 
        dark:scrollbar-thumb-rounded-lg">
            {bombas.length ? (
                <>
                    <h2 className="font-black text-3xl text-center">Listado de Bombas</h2>
                    <p className="text-xl mt-5 mb-10 text-center">
                        Administra tus {''}
                        <span className="text-blue-500 font-bold">Bombas</span>
                    </p>

                    {bombas.map((bomba) => (
                        <BombaDetails
                            key={bomba.id}
                            bomba={bomba}
                        />
                    ))}
                </>
            ) : (
                <>
                    <h2 className="font-black text-3xl text-center">No hay Bombas</h2>
                    <p className="text-xl mt-5 mb-10 text-center">
                        Comienza agregando Bombas {''}
                        <span className="text-blue-500 font-bold">Y aparecerán en este lugar</span>
                    </p>
                </>
            )}
        </div>
    );
}
