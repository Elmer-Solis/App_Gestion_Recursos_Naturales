import { Header } from "./Header"
import { Outlet } from "react-router-dom"
import { useState } from 'react';
import { Sidebar } from "./SideBar";
import { useAuth } from "@/store/storeLogin";

export default function MainLayout() {

    const [isAsideExpanded, setIsAsideExpanded] = useState(true);

    const toggleAside = () => {
        setIsAsideExpanded(!isAsideExpanded);
    };

    useAuth()

    return (
        <div className="grid h-screen w-full grid-cols-[auto_1fr]">
            <aside className={`shadow-md`}>
                <Sidebar sidebarOpen={isAsideExpanded} setSidebarOpen={toggleAside}

                />
            </aside>

            <div className="flex flex-col w-full">
                <header className="sticky top-0 z-10  w-full  shadow-md">
                    <Header />
                </header>

                <main className="flex-grow p-4 bg-main">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}






