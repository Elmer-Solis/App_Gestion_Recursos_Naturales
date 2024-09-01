
import { useFontaneroStore } from "@/store/storeFontanero";
import FontaneroDetails from "./FontaneroDetails";

export default function FontaneroList() {

    const fontaneros = useFontaneroStore((state) => state.fontaneros)


    return (
        // <div className="md:w-1/2 lg:3/5 md:h-screen overflow-y-scroll ">
        // <div className="md:w-1/2 lg:3/5 md:h-screen overflow-y-scroll scrollbar-thumb-[#4a4a4a] scrollbar-track-[#1a1a1a] scrollbar-thumb-rounded-lg">
        // <div className="md:w-1/2 lg:3/5 md:h-screen overflow-y-scroll scrollbar-thin scrollbar-thumb-[#4a4a4a] scrollbar-track-[#1a1a1a] scrollbar-thumb-rounded-lg">
        <div className="md:w-1/2 lg:3/5 md:h-screen overflow-y-scroll dark:scrollbar-thin dark:scrollbar-thumb-[#4a4a4a] dark:scrollbar-track-[#1a1a1a] dark:scrollbar-thumb-rounded-lg">
            {fontaneros.length ? (
                <>
                    <h2 className="font-black text-3xl text-center">Listado de Fontaneros</h2>
                    <p className="text-xl mt-5 mb-10 text-center">
                        Administra tus {''}
                        <span className="text-indigo-600 font-bold">Fontaneros</span>
                    </p>
                    {
                        fontaneros.map(fontanero => (
                            <FontaneroDetails
                                key={fontanero.id}
                                fontanero={fontanero}
                            />
                        ))
                    }

                </>
            ) : (
                <>
                    <h2 className="font-black text-3xl text-center">No hay Fontaneros</h2>
                    <p className="text-xl mt-5 mb-10 text-center">
                        Comienza agregando Fontaneros {''}
                        <span className="text-indigo-600 font-bold">Y apareceran en este lugar</span>
                    </p>
                </>
            )}
        </div>
    )
}
