import { Aside } from "@/components/Aside"
import { Header } from "@/components/Header"

import { Outlet } from "react-router-dom"


import {
    TooltipProvider,
} from "@/components/ui/tooltip"

export default function MainLayout() {
    return (
        <div className="grid h-screen w-full pl-[56px]">
            <TooltipProvider>
                <Aside />
            </TooltipProvider>
            <div className="flex flex-col">
                <Header />
                <Outlet />
            </div>
        </div>
    )
}

