import { Header } from "./Header"
import { Outlet } from "react-router-dom"
import { useState } from 'react';
import Asides from "./Side";


export default function MainLayout() {

    const [isAsideExpanded, setIsAsideExpanded] = useState(true);

    const toggleAside = () => {
        setIsAsideExpanded(!isAsideExpanded);
    };


    return (

        <div className="grid h-screen w-full grid-cols-[auto_1fr]">
            <aside className={`transition-all duration-300 ${isAsideExpanded ? 'w-64' : 'w-16'}`}>
                <Asides isExpanded={isAsideExpanded} toggleAside={toggleAside} />
            </aside>

            <div className="flex flex-col w-full">
                <header className="sticky top-0 z-10 h-16 w-full bg-white shadow-md">
                    <Header />
                </header>

                <main className="flex-grow p-4">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}






