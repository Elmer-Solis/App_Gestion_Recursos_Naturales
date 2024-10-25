
import {
    Card,
    CardFooter,
    CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

import { VecinosDetailItem } from "./VecinosDetailItem";
import { useSolicitudTrabajoStore } from "@/store/storeVecinos";

// Interfaz para Solicitud de Trabajo
interface SolicitudTrabajo {
    id: string;
    numero_expediente: number;
    nombre_solicitante: string;
    tarifa: string;
    fecha_ingreso: string; // Fecha en formato ISO (string)
    fontanero_id: string | null;
    bomba_distribucion_id: string | null;
};


type SolicitudDetailsProps = {
    solicitudes: SolicitudTrabajo;
};

export default function VecinosDetails({ solicitudes }: SolicitudDetailsProps) {
    const { toast } = useToast();


    const { deleteSolicitud, updateSolicitud, getSolicitudById } = useSolicitudTrabajoStore()

    const handleClick = () => {
        deleteSolicitud(solicitudes.id);

        toast({
            variant: "delete",
            title: "Eliminación Exitosa",
            description: "Fontanero eliminado correctamente",
        });
    };


    return (
        <Card className="mx-5 my-10 px-5 ">
            <CardHeader>
                <div className="flex items-center gap-3">
                    <section className="flex justify-center items-center w-14 h-14 rounded-full shadow-md bg-gradient-to-r from-[#000000] to-[#030a8f]">
                        <img src="/soli.png" alt="" />
                    </section>
                    <div>
                        <VecinosDetailItem label="Nombre" data={solicitudes.nombre_solicitante} />
                        <VecinosDetailItem label="Teléfono" data={solicitudes.tarifa} />

                    </div>
                </div>
            </CardHeader>
            <CardFooter className="flex flex-col lg:flex-row gap-3 justify-between ">
                <Button
                    className="py-2 px-10 text-white font-bold uppercase"
                    onClick={() => getSolicitudById(solicitudes.id)}
                >
                    Editar
                </Button>
                <Button
                    variant={"destructive"}
                    className="py-2 px-10 text-white font-bold uppercase"
                    onClick={handleClick}
                >
                    Eliminar
                </Button>
            </CardFooter>
        </Card>
    );
}
