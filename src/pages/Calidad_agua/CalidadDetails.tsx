import { useBombaStore } from "@/store/storeBombas";
import { useToast } from "@/hooks/use-toast";
import { useCalidadAguaStore } from "@/store/storeCalidadAgua";
import {
    Card,
    CardFooter,
    CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalidadDetailItem } from "./CalidadDetailItem";

export type CalidadAgua = {
    id: string;
    bomba_id: string;
    fecha_inspeccion: string; // Fecha en formato ISO (string)
    nivel_ph: number;
    nivel_cloro: number;
    otras_metricas: string;
};

type SolicitudDetailsProps = {
    calidad: CalidadAgua;
}

export function CalidadDetails({ calidad }: SolicitudDetailsProps) {
    const { toast } = useToast();
    const { deleteCalidad, getCalidadById } = useCalidadAguaStore();
    const bombas = useBombaStore((state) => state.bombas);

    const bombaAsignada = bombas.find((bomba) => bomba.id === calidad.bomba_id);

    const handleClick = () => {

        deleteCalidad(calidad.id)
        toast({
            variant: "delete",
            title: "Eliminación Exitosa",
            description: "Fontanero eliminado correctamente",
        });
    };
    return (
        <Card className="mx-20 my-8 px-5 ">
            <CardHeader>
                <div className="flex items-center gap-3">
                    <section className="flex justify-center items-center w-14 h-14 rounded-full shadow-md bg-gradient-to-r from-[#000000] to-[#030a8f]">
                        <img src="/agua.png" alt="agua" />
                    </section>
                    <div className="flex  flex-wrap justify-between w-full">
                        <div className="flex flex-col gap-y-2">
                            <CalidadDetailItem label="Inspeccion" data={calidad.fecha_inspeccion} />
                            <CalidadDetailItem label="Bomba" data={bombaAsignada ? bombaAsignada.name : "No asignada"} />
                        </div>
                        <div className="flex flex-col gap-y-2" >
                            <CalidadDetailItem label="Cloro" data={calidad.nivel_cloro.toString()} />
                            <CalidadDetailItem label="PH" data={calidad.nivel_ph.toString()} />
                        </div>
                    </div>
                </div>
            </CardHeader>
            <CardFooter className="flex flex-col lg:flex-row gap-3 justify-between ">
                <Button
                    className="py-2 px-10 text-white font-bold uppercase"
                    onClick={() => getCalidadById(calidad.id)}
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

