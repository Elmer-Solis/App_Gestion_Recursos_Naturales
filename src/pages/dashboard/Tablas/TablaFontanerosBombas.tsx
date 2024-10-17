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

export const TablaFontanerosBombas = () => {
    const fontaneros = useFontaneroStore((state) => state.fontaneros);
    const fetchFontaneros = useFontaneroStore((state) => state.fetchFontaneros);

    const bombas = useBombaStore((state) => state.bombas);
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
        <Card x-chunk="dashboard-01-chunk-6">
            <CardHeader>
                <CardTitle>Bombas de Agua</CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Nombre de la Bomba</TableHead>
                            <TableHead>Zonas Cubiertas</TableHead>
                            <TableHead>Fontaneros Asignados</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {bombas.length > 0 ? (
                            bombas.map((bomba) => (
                                <TableRow key={bomba.id}>
                                    <TableCell>{bomba.name}</TableCell>
                                    <TableCell>{bomba.zonas.join(', ')}</TableCell>
                                    <TableCell>
                                        {fontaneros.
                                            filter((fontanero) => fontanero.bomba === bomba.id)

                                            .map((fontanero) => fontanero.name)
                                            .join(', ') || 'No hay fontaneros asignados'}
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={3}>
                                    No hay bombas registradas
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}
