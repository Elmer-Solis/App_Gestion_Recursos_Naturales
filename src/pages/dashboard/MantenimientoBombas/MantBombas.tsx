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
import { useMantenimientoStore } from "@/store/storeCalendarioMant";
import { useBombaStore } from "@/store/storeBombas"; // Importamos el store de bombas
import { useEffect } from "react";

export const MantBombas = () => {
    const mantenimientos = useMantenimientoStore((state) => state.mantenimientos);
    const fetchMantenimientos = useMantenimientoStore((state) => state.fetchMantenimientos);

    // Obtenemos bombas y la función para hacer fetch desde el store de bombas
    const bombas = useBombaStore((state) => state.bombas);
    const fetchBombas = useBombaStore((state) => state.fetchBombas);

    useEffect(() => {
        const fetchData = async () => {
            await fetchMantenimientos(); // Llamamos a la función del store
            await fetchBombas(); // Llamamos a la función para obtener las bombas
        };
        fetchData();
    }, [fetchMantenimientos, fetchBombas]);

    // Función para obtener el nombre de la bomba por su ID
    const getBombaNameById = (bombaId: string | number) => {
        const bomba = bombas.find(b => b.id === bombaId.toString());
        return bomba ? bomba.name : "Bomba no encontrada";
    };

    return (
        <Card className="w-full" >
            <CardHeader>
                <CardTitle>Mantenimientos de Bombas</CardTitle>
            </CardHeader>
            <div className=" w-full h-full max-h-72 flex-grow overflow-y-auto 
                    dark:scrollbar-thin dark:scrollbar-thumb-[#000000] 
                    dark:scrollbar-track-[#0a0a0a] dark:scrollbar-thumb-rounded-lg">
                <Table className="w-full">
                    <TableHeader>
                        <TableRow>
                            <TableHead>Fecha de Inicio</TableHead>
                            <TableHead>Fecha de Fin</TableHead>
                            <TableHead>Nombre de la Bomba</TableHead>
                            <TableHead>Tipo de Mantenimiento</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {mantenimientos.length > 0 ? (
                            mantenimientos.map((mantenimiento, index) => (
                                <TableRow key={index}>
                                    <TableCell>{mantenimiento.fechaInicioMantenimiento.toLocaleDateString()}</TableCell>
                                    <TableCell>{mantenimiento.fechaFinMantenimiento.toLocaleDateString()}</TableCell>
                                    <TableCell>{getBombaNameById(mantenimiento.bombaId)}</TableCell>
                                    <TableCell>{mantenimiento.tipoMantenimiento}</TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={4}>No hay mantenimientos registrados</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </Card>
    );
};
