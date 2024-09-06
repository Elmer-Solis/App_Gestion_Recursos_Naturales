import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"

import { ModeToggle } from "@/components/settings/ModelToggle"
import { useAuthStore } from "@/store/storeLogin"

export const Header = () => {

    const user = useAuthStore((state) => state.user);

    return (
        <header className="flex h-[57px] justify-between items-center gap-1 border-b bg-background  py-10 px-12">
            <h1 className="text-xl font-bold">Gestion De Recursos Naturales</h1>
            <h2>Bienvenido {user?.name}</h2>

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