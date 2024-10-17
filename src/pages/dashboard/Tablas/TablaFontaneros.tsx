import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { useFontaneroStore } from "@/store/storeFontanero";
import { useBombaStore } from "@/store/storeBombas";
import { useEffect, useState } from "react";

// Importamos los hooks de Zustand

export function TableFontaneros() {
    const fontaneros = useFontaneroStore((state) => state.fontaneros);
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
        <Card x-chunk="dashboard-01-chunk-5">
            <CardHeader>
                <CardTitle>Fontaneros</CardTitle>
            </CardHeader>
            <CardContent className="h-full max-h-72 flex-grow overflow-y-auto 
            dark:scrollbar-thin dark:scrollbar-thumb-[#000000] 
            dark:scrollbar-track-[#0a0a0a] dark:scrollbar-thumb-rounded-lg" >
                <Table className="w-full">
                    <TableHeader>
                        <TableRow>
                            <TableHead>Nombre</TableHead>
                            <TableHead>Teléfono</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {fontaneros.length > 0 ? (
                            fontaneros.map((fontanero) => (
                                <TableRow key={fontanero.id}>
                                    <TableCell>{fontanero.name}</TableCell>
                                    <TableCell>{fontanero.phone}</TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={3}>
                                    No hay fontaneros registrados
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}
