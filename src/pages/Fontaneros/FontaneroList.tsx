import FontaneroDetails from "./FontaneroDetails";


export default function FontaneroList() {
    return (
        <div className="md:w-1/2 lg:3/5 md:h-screen overflow-y-scroll">
            <h2 className="font-black text-3xl text-center">Listado de Fontaneros</h2>
            <p className="text-xl mt-5 mb-10 text-center">
                Administra tus {''}
                <span className="text-indigo-600 font-bold">Fontaneros</span>
            </p>
            <FontaneroDetails />
        </div>
    )
}
