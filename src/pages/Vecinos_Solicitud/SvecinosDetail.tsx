import {
    Card,
    CardFooter,
    CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";


import { useSolicitudVecinoStore } from "@/store/storeSolicitud";
import { SvecinosDetailItem } from "./SvecinosDetailItem";


export type SolicitudTrabajo = {
    id: string; // SERIAL en SQL
    numero_expediente: string;
    fecha_ingreso: string; // Fecha en formato ISO (string)
    nombre_solicitante: string;
    direccion: string;
    telefono: number;
    nombre_sindico_acompanio: string;
    fecha_inspeccion: string; // Fecha en formato ISO (string)
    numero_recibo: number;
    monto: number;
    fecha_recibo: string; // Fecha en formato ISO (string)
    numero_orden_instalacion: number;
    fecha_instalacion: string; // Fecha en formato ISO (string)
    fontanero_id: string | null;
    observacion: string;
    numero_servicios: number;
    bomba_distribucion_id: string | null;
    tarifa: string;
    drenaje: string;
    numero_recibo_drenaje: number;
    monto_drenaje: number;
    levanto_adoquin: string;
    numero_recibo_garantia: number;
    deposito_garantia: string;
    numero_medidor: string;
};

type SolicitudDetailsProps = {
    solicitudes: SolicitudTrabajo;
};


export function SvecinosDetail({ solicitudes }: SolicitudDetailsProps) {


    const { toast } = useToast();

    const { deleteSolicitud, getSolicitudById } = useSolicitudVecinoStore()

    const handleClick = () => {
        deleteSolicitud(solicitudes.id);

        toast({
            variant: "delete",
            title: "Eliminación Exitosa",
            description: "Fontanero eliminado correctamente",
        });
    };

    return (
        <Card className=" my-4 px-1 ">

            <CardHeader>
                <div className="flex items-center gap-3">
                    <section className="flex justify-center items-center w-14 h-14 rounded-full shadow-md bg-gradient-to-r from-[#000000] to-[#030a8f]">
                        <img src="/documentos.png" alt="" />
                    </section>
                    <div className="flex flex-wrap justify-between w-full">
                        <div className="flex flex-col gap-y-2">
                            <SvecinosDetailItem label="Nombre" data={solicitudes.numero_expediente.toString()} />
                            <SvecinosDetailItem label="Telefono" data={solicitudes.telefono.toString()} />
                        </div>
                        <div className="flex flex-col gap-y-2">
                            <SvecinosDetailItem label="Expediente" data={solicitudes.numero_expediente} />
                            <SvecinosDetailItem label="Instalacion" data={solicitudes.fecha_instalacion} />
                        </div>
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
    )
}
