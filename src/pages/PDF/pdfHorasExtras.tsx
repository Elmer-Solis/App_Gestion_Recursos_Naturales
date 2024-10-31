import { Button } from "@/components/ui/button";
import { jsPDF } from "jspdf";

interface GeneratePDFButtonProps {
    data: Array<{ fontanero: string; horas_extras: number }>;
}

const GeneratePDFButton: React.FC<GeneratePDFButtonProps> = ({ data }) => {
    const handleGeneratePDF = () => {
        const doc = new jsPDF();

        // Add logo images to the PDF
        const leftLogoUrl = "/umgO.png"; // Path to the first logo (left corner)
        const rightLogoUrl = "/logo.png"; // Path to the second logo (right corner)

        doc.addImage(leftLogoUrl, "PNG", 15, 10, 35, 30); // Left logo (adjust coordinates and size as needed)
        doc.addImage(rightLogoUrl, "PNG", 155, 10, 30, 30); // Right logo (adjust coordinates and size as needed)

        // Add title with larger font size and centered position
        const title = "Reporte de Horas Extras";
        doc.setFontSize(20);
        const pageWidth = doc.internal.pageSize.getWidth();
        const textWidth = doc.getTextWidth(title);
        const xCentered = (pageWidth - textWidth) / 2;
        doc.text(title, xCentered, 50);

        // Add table headers
        doc.setFontSize(14);
        doc.setTextColor(0, 0, 255); // Set color to blue
        doc.text("Fontanero", 20, 70);
        doc.text("Horas", 100, 70);
        doc.text("Extras", 150, 70);

        // Reset text color to black for data rows
        doc.setTextColor(0, 0, 0);

        // Generate rows with fontanero, horas and extras
        let yPosition = 80;
        data.forEach((item) => {
            const fontanero = item.fontanero || "Desconocido";
            const horas = item.horas_extras?.toString() || "0";
            const extras =
                item.horas_extras > 0
                    ? "Sí"
                    : item.horas_extras < 0
                        ? "Debe"
                        : "";

            doc.text(fontanero, 20, yPosition);
            doc.text(horas, 100, yPosition);
            doc.text(extras, 150, yPosition);
            yPosition += 10;
        });

        // Save the PDF
        doc.save("Horas_Extras_Report.pdf");
    };

    return (
        <Button onClick={handleGeneratePDF}>
            Generar PDF
        </Button>
    );
};

export default GeneratePDFButton;