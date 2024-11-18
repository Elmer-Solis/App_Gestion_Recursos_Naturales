
import { useFontaneroStore } from "@/store/storeFontanero";
import { useBombaStore } from "@/store/storeBombas";
import { useEffect, useState } from "react";
import { HorasExtras } from "./Chart";
import GeneratePDFButton from "@/pages/dashboard/SubDashboard/HorasExtras/PDF";

interface ChartData {
    fontanero: string | null;
    horas_extras: number | null;
}

export default function Gestion() {

    const [chartData, setChartData] = useState<ChartData[]>([]);
    const fetchFontaneros = useFontaneroStore((state) => state.fetchFontaneros);
    const fetchBombas = useBombaStore((state) => state.fetchBombas);
    const [loading, setLoading] = useState(true);
    // Estado de carga
    useEffect(() => {
        // Fetch both fontaneros and bombas when the component mounts
        const fetchData = async () => {
            setLoading(true); // Comenzamos la carga
            try {
                await Promise.all([fetchFontaneros(), fetchBombas()]);
            } catch (error) {
                console.error("Error al cargar los datos", error);
            } finally {
                setLoading(false); // Finalizamos la carga
            }
        };
        fetchData();
    }, [fetchFontaneros, fetchBombas]);

    // Muestra un estado de carga mientras los datos se están recuperando
    if (loading) {
        return <div className="p-8 text-center">Cargando datos...</div>;
    }

    return (
        <main className="container 
        mx-auto mt-5 px-4 sm:px-6 ">
            <div className="grid grid-cols-1
             md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8 h-full">
                <div className="pt-4 md:pt-0">
                    <HorasExtras onDataLoaded={setChartData} />
                    <GeneratePDFButton
                        data={chartData.map((item) => ({
                            fontanero: item.fontanero ?? "Desconocido",
                            horas_extras: item.horas_extras ?? 0,
                        }))}
                    />
                </div>
            </div>
        </main>
    )
}
