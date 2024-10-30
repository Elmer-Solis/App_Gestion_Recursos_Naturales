import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"

import { ModeToggle } from "@/components/settings/ModelToggle"
import { useAuthStore } from "@/store/storeLogin"
import { useLocation } from "react-router-dom"

export const Header = () => {
    const user = useAuthStore((state) => state.user);
    const location = useLocation();

    // Función para transformar la ruta
    const formatPathname = (pathname: string) => {
        if (pathname === "/" || pathname === "") {
            return "Dashboard"; // Si la ruta es "/", muestra "Dashboard"
        }
        // Excepciones para rutas específicas
        if (pathname === "/calidad") {
            return "Calidad Agua";
        }
        // if (pathname === "/solicitud") {
        //     return "Solicitud Vecinos";
        // }
        // Elimina la barra inclinada inicial y divide las palabras
        const words = pathname.replace("/", "").split("/");
        // Capitaliza la primera letra de cada palabra
        return words
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");
    };

    // Condicional para ocultar el Header en la ruta "/solicitud"
    if (location.pathname === "/solicitud" || location.pathname === '/bombas'
        || location.pathname === "/fontaneros"
    ) {
        return null; // No renderizar el header
    }


    return (
        <header className="flex h-[57px] justify-between items-center gap-1 border-b bg-background  py-10 px-12">
            <h1 className="font-black text-4xl">{formatPathname(location.pathname)}</h1>
            {/* Muestra "Bienvenido" solo en la ruta "/" */}
            {location.pathname === "/" && (
                <h2 className="font-black text-4xl">Bienvenido {user?.name}</h2>
            )}
            <div className="flex gap-4">
                <ModeToggle />
                <Avatar>
                    {/* Usa la imagen del usuario autenticado si está disponible */}
                    <AvatarImage src={user?.picture || "https://github.com/shadcn.png"} alt={user?.name || "@shadcn"} />
                    <AvatarFallback>{user?.name?.[0]?.toUpperCase() || "CN"}</AvatarFallback>
                </Avatar>
            </div>
        </header>
    );
}