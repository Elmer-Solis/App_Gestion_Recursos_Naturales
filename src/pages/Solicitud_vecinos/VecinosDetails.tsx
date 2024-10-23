
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
    id: number;
    vecinoNombre: string;
    direccionVecino: string;
    fechaSolicitud: Date;
    estadoSolicitud: string;
    tituloSolicitud: string;
    descripcionSolicitud?: string;
}


type SolicitudDetailsProps = {
    solicitud: SolicitudTrabajo;
};

export default function VecinosDetails({ solicitud }: SolicitudDetailsProps) {
    const { toast } = useToast();


    const { deleteSolicitud, updateSolicitud } = useSolicitudTrabajoStore()

    const handleClick = () => {
        deleteSolicitud(solicitud.id);

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
                        <VecinosDetailItem label="Nombre" data={solicitud.vecinoNombre} />
                        <VecinosDetailItem label="Teléfono" data={solicitud.estadoSolicitud} />

                    </div>
                </div>
            </CardHeader>
            <CardFooter className="flex flex-col lg:flex-row gap-3 justify-between ">
                <Button
                    className="py-2 px-10 text-white font-bold uppercase"
                    onClick={() => updateSolicitud(solicitud)}
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
