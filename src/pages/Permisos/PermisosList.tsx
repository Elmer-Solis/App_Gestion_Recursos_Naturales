import { usePermisoStore } from "@/store/storePermisos";
import { useEffect, useState } from "react";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { PermisosDetail } from './PermisosDetail';

export function PermisosList() {

    const { fetchPermiso, permisos } = usePermisoStore();
    const [searchUser, setSearchUser] = useState<null | string>(null);

    // Filtra las solicitudes según el rol seleccionado en el Select
    const filteredSolicitudes = permisos.filter((solicitud) =>
        searchUser === null || solicitud.role === searchUser
    );

    useEffect(() => {
        fetchPermiso();
    }, [fetchPermiso]);

    return (
        <div className="mt-4 md:w-2/5 lg:w-2/5 md:h-full flex-grow">
            <div className="flex flex-col md:flex-row mt-14 md:mt-0 mb-4 px-20 md:mb-0 justify-center gap-4">
                <Select
                    onValueChange={(value) => setSearchUser(value === "todas" ? null : value)}
                    value={searchUser || "todas"}
                >
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Elige un Usuario" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="todas">Todos los Usuarios</SelectItem>
                        <SelectItem value="Superadmin">SuperAdmin</SelectItem>
                        <SelectItem value="Admin">Admin</SelectItem>
                        <SelectItem value="Fontanero">Fontanero</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div
                className="h-full overflow-y-scroll
                dark:scrollbar-thin dark:scrollbar-thumb-[#000000] dark:scrollbar-track-[#0a0a0a] 
                dark:scrollbar-thumb-rounded-lg"
            >
                {filteredSolicitudes.length ? (
                    <>
                        {filteredSolicitudes.map((permiso) => (
                            <PermisosDetail
                                key={permiso.id}
                                permiso={permiso}
                            />
                        ))}
                    </>
                ) : (
                    <>
                        <h2 className="font-black text-3xl text-center mt-6 md:mt-0">
                            No hay usuarios
                        </h2>
                        <p className="text-xl mt-5 mb-10 text-center">
                            Comienza agregando Usuarios {""}
                            <span className="text-blue-500 font-bold">
                                Y aparecerán en este lugar
                            </span>
                        </p>
                    </>
                )}
            </div>
        </div>
    );
}
