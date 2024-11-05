import { usePermisoStore } from "@/store/storePermisos";
import { PermisosDetailItem } from "./PermisosDetailItem"
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
    Card,
} from "@/components/ui/card";
type UserRow = {
    id: string;
    email: string;
    role: string
}

type SolicitudDetailsProps = {
    permiso: UserRow;
}

export function PermisosDetail({ permiso }: SolicitudDetailsProps) {
    const { toast } = useToast();
    const { deletePermiso, getPermisoById } = usePermisoStore()

    const handleClick = () => {

        deletePermiso(permiso.id)
        toast({
            variant: "delete",
            title: "Eliminación Exitosa",
            description: "Fontanero eliminado correctamente",
        });
    };
    return (
        <Card className="mx-5 md:mx-20 my-5 px-5 py-8 ">

            <div className="flex items-center gap-4  mb-5 ">
                <section className="flex justify-center items-center w-14 h-14 rounded-full shadow-md bg-gradient-to-r from-[#000000] to-[#030a8f]">
                    <img src="/admin.png" alt="agua" />
                </section>
                <div className="flex  flex-wrap justify-between w-full m">
                    <div className="flex flex-col gap-y-2 mb-2 md:mb-0">
                        <PermisosDetailItem label="Inspeccion" data={permiso.email} />
                        <PermisosDetailItem label="Inspeccion" data={permiso.role} />

                    </div>

                </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-3 justify-between ">
                <Button
                    className="py-2 px-10 text-white font-bold uppercase"
                    onClick={() => getPermisoById(permiso.id)}
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
            </div>
        </Card>
    )
}
