
import { useBombaStore } from "@/store/storeBombas";
import BombaDetails from "./BombaDetails";


export default function BombaList() {

    const bombas = useBombaStore((state) => state.bombas)

    return (
        <div className="md:w-1/2 lg:3/5 md:h-screen overflow-y-scroll dark:scrollbar-thin dark:scrollbar-thumb-[#000000] dark:scrollbar-track-[#0a0a0a] dark:scrollbar-thumb-rounded-lg">
            {bombas.length ? (
                <>
                    <h2 className="font-black text-3xl text-center">Listado de Bombas</h2>
                    <p className="text-xl mt-5 mb-10 text-center">
                        Administra tus {''}
                        <span className="text-blue-500 font-bold">Bombas</span>
                    </p>

                    {bombas.map(bomba => (
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
                        <span className="text-blue-500 font-bold">Y apareceran en este lugar</span>
                    </p>
                </>
            )}
        </div>
    )
}
