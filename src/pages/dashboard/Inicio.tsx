
// import { useFontaneroStore } from "@/store/storeFontanero";
// import { useBombaStore } from "@/store/storeBombas";
// import { useEffect, useState } from "react";
// import { HorasExtras } from './HorasExtras/HorasExtras';
// import GeneratePDFButton from "../PDF/pdfHorasExtras";
import DashboardPrincipal from './dashboardprincipal/DashboardPrincipal';
import Graficos from './Tablas/Graficos';

// import {
//     Card,
//     CardContent,
//     CardDescription,
//     CardFooter,
//     CardHeader,
//     CardTitle,
// } from "@/components/ui/card"



// Importamos los hooks de Zustand
export function Inicio() {

    // const [chartData, setChartData] = useState<ChartData[]>([]);

    // const fetchFontaneros = useFontaneroStore((state) => state.fetchFontaneros);
    // const fetchBombas = useBombaStore((state) => state.fetchBombas);
    // const [loading, setLoading] = useState(true); // Estado de carga
    // useEffect(() => {
    //     // Fetch both fontaneros and bombas when the component mounts
    //     const fetchData = async () => {
    //         setLoading(true); // Comenzamos la carga
    //         try {
    //             await Promise.all([fetchFontaneros(), fetchBombas()]);
    //         } catch (error) {
    //             console.error("Error al cargar los datos", error);
    //         } finally {
    //             setLoading(false); // Finalizamos la carga
    //         }
    //     };
    //     fetchData();
    // }, [fetchFontaneros, fetchBombas]);
    // // Muestra un estado de carga mientras los datos se están recuperando
    // if (loading) {
    //     return <div className="p-8 text-center">Cargando datos...</div>;
    // }

    return (

        <div className="flex items-center justify-center h-full w-full ">

            {/* <DashboardPrincipal /> */}
            <Graficos />
        </div>
    );
}

