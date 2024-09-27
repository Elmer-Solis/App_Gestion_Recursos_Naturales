import {
    Card,
    CardFooter,
    CardHeader,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

import FontaneroDetailItem from "./FontaneroDetailItem";
import { Fontanero } from '../../types/index';
import { useFontaneroStore } from "@/store/storeFontanero";

type FontaneroDetailsProps = {
    fontanero: Fontanero
}
export default function FontaneroDetails({ fontanero }: FontaneroDetailsProps) {

    const { toast } = useToast()

    const deleteFontanero = useFontaneroStore((state) => state.deleteFontanero)
    const getFontaneroById = useFontaneroStore((state) => state.getFontaneroById)

    const handleClick = () => {
        deleteFontanero(fontanero.id)

        toast({
            variant: 'delete',
            title: "Eliminación Exitosa ",
            description: "Fontanero eliminado Correctamente ",
        })
    }

    return (
        <Card className="mx-5 my-10 px-5 ">
            <CardHeader >
                <div className="flex items-center gap-3">
                    <section className="flex justify-center items-center w-14 h-14 rounded-full shadow-md bg-gradient-to-r from-[#000000] to-[#030a8f]  ">
                        <img src="/fontanero.png" alt="" />
                    </section>
                    <div>
                        <FontaneroDetailItem label='Nombre' data={fontanero.name} />
                        <FontaneroDetailItem label='Telefono' data={fontanero.phone} />
                        <FontaneroDetailItem label='Bomba' data={fontanero.bomba} />
                    </div>
                </div>
            </CardHeader>
            <CardFooter className="flex flex-col lg:flex-row gap-3 justify-between ">
                <Button
                    className="py-2 px-10 text-white font-bold uppercase"
                    onClick={() => getFontaneroById(fontanero.id)}
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
