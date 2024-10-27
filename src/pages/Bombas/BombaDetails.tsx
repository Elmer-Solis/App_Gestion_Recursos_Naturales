import {
    Card,
    CardFooter,
    CardHeader,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";


import { Bomba } from '../../types/index';
import { useBombaStore } from "@/store/storeBombas";
import BombaDetailItem from "./BombaDetailItem";

type BombaDetailsProps = {
    bomba: Bomba
}

export default function BombaDetails({ bomba }: BombaDetailsProps) {

    const { toast } = useToast()

    const deleteBomba = useBombaStore((state) => state.deleteBomba)
    const getBombaById = useBombaStore((state) => state.getBombaById)

    const handleClick = () => {
        deleteBomba(bomba.id)

        toast({
            variant: 'delete',
            title: "Eliminación Exitosa ",
            description: "Bomba eliminado Correctamente ",
        })
    }

    return (
        <Card className="mx-20 my-8 px-5 ">
            <CardHeader >
                <div className="flex items-center gap-4">
                    <section className="flex justify-center items-center w-14 h-14 rounded-full shadow-md bg-gradient-to-r from-[#000000] to-[#030a8f]  ">
                        <img src="/bomba.png" alt="" />
                    </section>

                    <div className="flex  flex-wrap justify-between w-full">

                        <div className="flex flex-col gap-y-2">
                            <BombaDetailItem label='Nombre' data={bomba.name} />
                            <BombaDetailItem label='Direccion' data={bomba.direccion} />
                        </div>
                        <div className="flex flex-col gap-y-2">
                            <BombaDetailItem label='Capacidad' data={bomba.bombeo} />
                            <BombaDetailItem label='Zonas' data={bomba.zonas.join(', ')} />
                        </div>
                    </div>
                    {/* Renderizar las zonas */}

                </div>
            </CardHeader>
            <CardFooter className="flex flex-col lg:flex-row gap-3 justify-between ">
                <Button
                    className="py-2 px-10 text-white font-bold uppercase"
                    onClick={() => getBombaById(bomba.id)}
                >
                    Editar</Button>
                <Button
                    variant={"destructive"}
                    className="py-2 px-10 text-white font-bold uppercase"
                    onClick={handleClick}
                >
                    Eliminar</Button>
            </CardFooter>
        </Card>
    )
}
