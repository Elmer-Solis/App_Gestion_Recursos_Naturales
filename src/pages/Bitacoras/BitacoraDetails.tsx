import {
    Card,
    CardFooter,
    CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { BitacoraDetailItem } from "./BitacoraDetailItem";
import { useBitacoraTomasStore } from "@/store/storeBitacoras";

export type BitacoraTomas = {
    id: string;
    zona_distribucion: string;
    total_tomas: number;
    tomas_usadas: number;
    tomas_legales: number;
    latitud: string;
    longitud: string;
    fecha_registro: string; // Fecha en formato ISO (string)
    fontanero_id: string | null;
    notas: string;
};


type SolicitudDetailsProps = {
    bitacoras: BitacoraTomas;
};
export function BitacoraDetails({ bitacoras }: SolicitudDetailsProps) {

    const { toast } = useToast();

    const { getBitacoraById, deleteBitacora } = useBitacoraTomasStore()

    const handleClick = () => {
        deleteBitacora(bitacoras.id);

        toast({
            variant: "delete",
            title: "Eliminación Exitosa",
            description: "Fontanero eliminado correctamente",
        });
    };


    return (
        <Card className=" mx-20 my-8 px-5 ">

            <CardHeader>
                <div className="flex items-center gap-3">
                    <section className="flex justify-center items-center w-14 h-14 rounded-full shadow-md bg-gradient-to-r from-[#000000] to-[#030a8f]">
                        <img src="/maps.png" alt="" />
                    </section>
                    <div className="flex flex-wrap justify-between w-full">
                        <div className="flex flex-col gap-y-2">
                            <BitacoraDetailItem label="Latidud" data={bitacoras.latitud} />
                            <BitacoraDetailItem label="Longitud" data={bitacoras.longitud} />
                        </div>
                        <div className="flex flex-col gap-y-2">
                            <BitacoraDetailItem label="Registro" data={bitacoras.fecha_registro} />
                            <BitacoraDetailItem label="Total tomas" data={bitacoras.total_tomas.toString()} />
                        </div>
                    </div>
                </div>
            </CardHeader>


            <CardFooter className="flex flex-col lg:flex-row gap-3 justify-between ">
                <Button
                    className="py-2 px-10 text-white font-bold uppercase"
                    onClick={() => getBitacoraById(bitacoras.id)}
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