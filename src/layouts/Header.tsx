
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"


import { ModeToggle } from "@/components/settings/ModelToggle"

export const Header = () => {
    return (
        <header className="flex h-[57px] justify-between items-center gap-1 border-b bg-background  py-10 px-12">

            <h1 className="text-xl font-bold">Gestion De Recursos Naturales</h1>

            <div className="flex gap-4">
                <ModeToggle />
                <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                    <AvatarFallback>CN</AvatarFallback>

                </Avatar>
            </div>

        </header>
    )
}
