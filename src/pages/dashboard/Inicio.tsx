
import { useFontaneroStore } from "@/store/storeFontanero";
import { useBombaStore } from "@/store/storeBombas";
import { useEffect, useState } from "react";
import { HorasExtras } from './HorasExtras/HorasExtras';
import { TableFontaneros } from './Tablas/TablaFontaneros';
import { TablaFontanerosBombas } from "./Tablas/TablaFontanerosBombas";
// Importamos los hooks de Zustand
export function Inicio() {

    const fetchFontaneros = useFontaneroStore((state) => state.fetchFontaneros);
    const fetchBombas = useBombaStore((state) => state.fetchBombas);
    const [loading, setLoading] = useState(true); // Estado de carga
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
        <main className="container mx-auto mt-5 ">
            <div className="grid grid-cols-3 gap-12">
                <HorasExtras />
                <TablaFontanerosBombas />
                <TableFontaneros />
                <TableFontaneros />
                <TableFontaneros />
            </div>
        </main>
    );
}

