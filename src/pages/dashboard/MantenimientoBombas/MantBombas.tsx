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
import { useEffect, useState } from "react";

export const MantBombas = () => {
    const mantenimientos = useMantenimientoStore((state) => state.mantenimientos);
    const fetchMantenimientos = useMantenimientoStore((state) => state.fetchMantenimientos);

    useEffect(() => {
        const fetchData = async () => {
            await fetchMantenimientos(); // Llamamos a la función del store
        };
        fetchData();
    }, [fetchMantenimientos]);


    return (
        <Card x-chunk="dashboard-01-chunk-5">
            <CardHeader>
                <CardTitle>Mantenimientos de Bombas</CardTitle>
            </CardHeader>
            <CardContent className="h-full max-h-72 flex-grow overflow-y-auto 
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
                                    <TableCell>{mantenimiento.bombaId}</TableCell>
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
            </CardContent>
        </Card>
    );
};
