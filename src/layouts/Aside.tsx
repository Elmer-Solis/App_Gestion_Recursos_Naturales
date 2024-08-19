import { NavLink } from "react-router-dom";
import {
    Book,
    Bot,
    Code2,
    LifeBuoy,
    Settings2,
    SquareTerminal,
    SquareUser,
    Triangle,
    SquareChevronRight,
    SquareChevronLeft
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
                {/* <aside className="h-full flex flex-col  border-r shadow-sm"> */}

                <header className=" flex items-center border-b  px-4 py-5">
                    <span className={`${isExpanded ? 'block' : 'hidden'} text-lg font-bold`}>Menu</span>
                    <Button variant="outline" size="icon" aria-label="Home"
                        onClick={toggleAside}
                    >
                        {isExpanded
                            ? <SquareChevronLeft className="size-7 " />
                            : <SquareChevronRight className="size-7 " />}
                    </Button>
                </header>

                <nav className="grid gap-1 p-2">

                    <NavLink to="/" className="flex items-center p-4 ">
                        <SquareTerminal className="text-2xl" />
                        <span className={`ml-4 transition-all duration-300 ${isExpanded ? 'inline' : 'hidden'}`}>
                            Menu
                        </span>
                    </NavLink>

                    <NavLink to="/personal" className="flex items-center p-4 ">
                        <SquareTerminal className="text-2xl" />
                        <span className={`ml-4 transition-all duration-300 ${isExpanded ? 'inline' : 'hidden'}`}>
                            Menu
                        </span>
                    </NavLink>

                    <NavLink to="/bomba" className="flex items-center p-4 ">
                        <SquareTerminal className="text-2xl" />
                        <span className={`ml-4 transition-all duration-300 ${isExpanded ? 'inline' : 'hidden'}`}>
                            Menu
                        </span>
                    </NavLink>

                    <NavLink to="/calendario" className="flex items-center p-4 ">
                        <SquareTerminal className="text-2xl" />
                        <span className={`ml-4 transition-all duration-300 ${isExpanded ? 'inline' : 'hidden'}`}>
                            Menu
                        </span>
                    </NavLink>

                    <NavLink to="/vecinos" className="flex items-center p-4 ">
                        <SquareTerminal className="text-2xl" />
                        <span className={`ml-4 transition-all duration-300 ${isExpanded ? 'inline' : 'hidden'}`}>
                            Menu
                        </span>
                    </NavLink>

                    <NavLink to="/proyectos" className="flex items-center p-4 ">
                        <SquareTerminal className="text-2xl" />
                        <span className={`ml-4 transition-all duration-300 ${isExpanded ? 'inline' : 'hidden'}`}>
                            Menu
                        </span>
                    </NavLink>

                </nav>

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

//  <nav className="flex gap-4">
//                         <NavLink
//                             to="/"

//                             className={({ isActive }) =>
//                                 isActive ? 'text-orange-500 uppercase font-bold' : 'text-white uppercase font-bold'
//                             }>Inicio</NavLink>


