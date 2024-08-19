import { NavLink } from "react-router-dom";
import {
    LifeBuoy,
    SquareUser,
    SquareChevronRight,
    SquareChevronLeft,
    LayoutDashboard,
    User,
    BrickWall,
    CalendarDays,
    FolderOpenDot,
    Users
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip"

import {
    TooltipProvider,
} from "@/components/ui/tooltip"

interface AsideProps {
    isExpanded: boolean;
    toggleAside: () => void;
}


export const Aside = ({ isExpanded, toggleAside }: AsideProps) => {

    return (
        <>
            <aside className="h-full flex flex-col  border-r px-2 shadow-sm">

                <header className=" flex items-center border-b  px-5 py-5">
                    <span className={`${isExpanded ? 'block' : 'hidden'} text-xl font-bold`}>
                        <h2>Menu</h2>
                    </span>

                    <Button variant="outline" size="icon" aria-label="Home"
                        onClick={toggleAside}
                    // className="absolute left-40 top-4 z-20  "
                    >
                        {isExpanded
                            ? <SquareChevronLeft className="size-7 " />
                            : <SquareChevronRight className="size-7 " />}
                    </Button>
                </header>

                <nav className="grid gap-1 p-2">

                    <NavLink to="/" className="flex items-center p-4 ">
                        <LayoutDashboard />
                        <span className={`ml-4 transition-all duration-300 ${isExpanded ? 'inline' : 'hidden'}`}>
                            Dashboard
                        </span>
                    </NavLink>


                    <NavLink to="/personal" className="flex items-center p-4  ">
                        <User className="text-2xl" />
                        <span className={`ml-4 transition-all duration-300 ${isExpanded ? 'inline' : 'hidden'}`}>
                            Personal
                        </span>
                    </NavLink>

                    <NavLink to="/bomba" className="flex items-center p-4 ">
                        <BrickWall className="text-2xl" />
                        <span className={`ml-4 transition-all duration-300 ${isExpanded ? 'inline' : 'hidden'}`}>
                            Bomba
                        </span>
                    </NavLink>

                    <NavLink to="/calendario" className="flex items-center p-4 ">
                        <CalendarDays className="text-2xl" />
                        <span className={`ml-4 transition-all duration-300 ${isExpanded ? 'inline' : 'hidden'}`}>
                            Calendario
                        </span>
                    </NavLink>

                    <NavLink to="/proyectos" className="flex items-center p-4 ">
                        <FolderOpenDot className="text-2xl" />
                        <span className={`ml-4 transition-all duration-300 ${isExpanded ? 'inline' : 'hidden'}`}>
                            Proyecto
                        </span>
                    </NavLink>

                    <NavLink to="/vecinos" className="flex items-center p-4   ">
                        <Users className="text-2xl" />
                        <span className={`ml-4 transition-all duration-300 ${isExpanded ? 'inline' : 'hidden'}`}>
                            Vecino
                        </span>
                    </NavLink>
                </nav>

                {/* <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <NavLink to="/vecinos" className="flex items-center p-4   ">
                                <Users className="text-2xl" />
                                <span className={`ml-4 transition-all duration-300 ${isExpanded ? 'inline' : 'hidden'}`}>
                                    Vecino
                                </span>
                            </NavLink>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Vecino</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider> */}

                <nav className="mt-auto grid gap-1 p-2">
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="mt-auto rounded-lg"
                                    aria-label="Help"
                                >
                                    <LifeBuoy className="size-5" />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent side="right" sideOffset={5}>
                                Help
                            </TooltipContent>
                        </Tooltip>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="mt-auto rounded-lg"
                                    aria-label="Account"
                                >
                                    <SquareUser className="size-5" />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent side="right" sideOffset={5}>
                                Account
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </nav>
            </aside>
        </>
    )
}


