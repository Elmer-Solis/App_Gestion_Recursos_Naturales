
import { useSolicitudstore } from '@/store/storeSolicitud';
import supabase from '@/supabase/supabase.config';
import { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { jsPDF } from "jspdf";

// Importing table components
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

// Define the type of each expediente based on the view's data structure
interface Expediente {
    id: string;
    direccion: string | null;
    nombre_solicitante: string | null;
    telefono: number | null;
    zona: string | null;
}

export default function TablaExpediente() {
    const { setActiveSolicitudId } = useSolicitudstore();
    const [expedientes, setExpedientes] = useState<Expediente[]>([]); // Explicitly typed

    useEffect(() => {
        const fetchExpedientes = async () => {
            const { data, error } = await supabase
                .from('vista_solicitudes_pendientes') // Call the view
                .select('*');
            if (error) {
                console.error('Error al obtener expedientes con instalación', error.message);
            } else if (data) {
                setExpedientes(data as Expediente[]); // Cast data to Expediente[]
            }
        };

        fetchExpedientes();
    }, []);

    const handleGeneratePDF = () => {
        const doc = new jsPDF();

        // Add logo images to the PDF
        const leftLogoUrl = "/umgO.png"; // Path to the first logo (left corner)
        const rightLogoUrl = "/logo.png"; // Path to the second logo (right corner)

        // Add logos
        doc.addImage(leftLogoUrl, "PNG", 15, 10, 35, 30); // Left logo (adjust coordinates and size as needed)
        doc.addImage(rightLogoUrl, "PNG", 155, 10, 30, 30); // Right logo (adjust coordinates and size as needed)

        // Add title with larger font size and centered position
        const title = "Reporte de Solicitudes Pendientes";
        doc.setFontSize(20);
        const pageWidth = doc.internal.pageSize.getWidth();
        const textWidth = doc.getTextWidth(title);
        const xCentered = (pageWidth - textWidth) / 2;
        doc.text(title, xCentered, 50); // Adjusted y position to avoid overlap with logos

        // Add table headers
        doc.setFontSize(14);
        doc.setTextColor(0, 0, 255); // Set color to blue
        doc.text("Nombre del Solicitante", 20, 70); // Adjusted y position
        doc.text("Teléfono", 100, 70); // Adjusted y position
        doc.text("Dirección", 140, 70); // Adjusted y position

        // Reset text color to black for data rows
        doc.setTextColor(0, 0, 0);

        // Generate rows with expediente data
        let yPosition = 80; // Adjusted starting position for data rows
        expedientes.forEach((expediente) => {
            const nombreSolicitante = expediente.nombre_solicitante || "N/A";
            const telefono = expediente.telefono?.toString() || "N/A";
            const direccion = expediente.direccion || "N/A";

            doc.text(nombreSolicitante, 20, yPosition);
            doc.text(telefono, 100, yPosition);
            doc.text(direccion, 140, yPosition);
            yPosition += 10; // Increment for next row
        });

        // Add total at the end of the PDF
        doc.text(`Total Expedientes: ${expedientes.length}`, 20, yPosition);

        // Save the PDF
        doc.save("Solicitudes_Pendientes_Report.pdf");
    };
    return (
        <>
            <Table>
                <TableCaption>Expedientes Sin Orden de Instalación</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Nombre del Solicitante</TableHead>
                        <TableHead>Teléfono</TableHead>
                        <TableHead>Dirección</TableHead>
                        <TableHead>Zona</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {expedientes.map((expediente) => (
                        <TableRow key={expediente.id} onClick={() => setActiveSolicitudId(expediente.id)}>
                            <TableCell className="font-medium">{expediente.nombre_solicitante || "N/A"}</TableCell>
                            <TableCell>{expediente.telefono || "N/A"}</TableCell>
                            <TableCell>{expediente.direccion || "N/A"}</TableCell>
                            <TableCell>{expediente.zona || "N/A"}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableCell colSpan={4} className="text-right font-semibold">
                            Total Expedientes: {expedientes.length}
                        </TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
            <Button onClick={handleGeneratePDF} className="mt-4">
                Generar PDF
            </Button>
        </>
    );
}
