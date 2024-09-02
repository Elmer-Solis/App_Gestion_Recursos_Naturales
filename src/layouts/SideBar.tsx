import React from "react";
import {
    Home,
    Settings,
    BarChart2,
    LogOut,
    ChevronLeft,
    CalendarDays,
    User,
    WashingMachine,
} from "lucide-react";
import { NavLink } from "react-router-dom";

interface SidebarProps {
    sidebarOpen: boolean;
    setSidebarOpen: (open: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ sidebarOpen, setSidebarOpen }) => {
    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    return (
        <div className="relative h-screen">
            <button
                className={`absolute top-5 transform ${sidebarOpen ? "right-[-16px]" : "right-[-26px] rotate-180"
                    } w-8 h-8 rounded-full  flex items-center justify-center transition-all duration-400`}
                onClick={toggleSidebar}
                style={{ zIndex: 1000 }}
            >
                <ChevronLeft />
            </button>

            <aside
                className={`border-r  text-white transition-all duration-300 ${sidebarOpen ? 'w-44' : 'w-18'} h-full flex flex-col`}
            >
                <div className="flex justify-center items-center pt-5 mb-5">
                    <div className="transform transition-transform">
                        <img
                            src="/logoAgua.png"
                            alt="Logo"
                            className={`h-9 w-9 ${sidebarOpen ? "scale-90" : "scale-150"
                                } transition-transform`}
                        />
                    </div>
                    {sidebarOpen && <h1 className="text-lg">Gestión Agua </h1>}
                </div>

                <nav className="flex-1 overflow-y-auto">
                    <ul>
                        {linksArray.map(({ icon, label, to }) => (
                            <li className="my-2 " key={label}>
                                <NavLink
                                    to={to}
                                    className={({ isActive }) =>
                                        `flex items-center p-2 px-6 rounded ${isActive ? "bg-gray-200 dark:bg-gray-800" : ""
                                        } hover:bg-gray-400 dark:hover:bg-gray-700 transition-colors`
                                    }

                                >
                                    <span className="text-xl text-gray-800 dark:text-gray-50 ">{icon}</span>
                                    {sidebarOpen && <span className="ml-3 text-gray-800 dark:text-gray-50 ">{label}</span>}
                                </NavLink>

                            </li>
                        ))}
                    </ul>
                </nav>

                <hr className="my-4 border-gray-800 " />

                <nav>
                    <ul>
                        {secondarylinksArray.map(({ icon, label, to }) => (
                            <li className="my-2 px-4" key={label}>
                                <NavLink
                                    to={to}
                                    className={({ isActive }) =>
                                        `flex items-center p-2 rounded ${isActive ? "bg-gray-800" : ""
                                        } hover:bg-gray-700 transition-colors`
                                    }
                                // aria-label={label}
                                >
                                    <span className="text-xl text-gray-800 dark:text-blue-50">{icon}</span>
                                    {sidebarOpen && <span className="ml-3 text-gray-50  ">{label}</span>}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </nav>

            </aside>
        </div>
    );
};

// Data links
const linksArray = [
    { label: "Home", icon: <Home />, to: "/" },
    { label: "Fontaneros", icon: <User />, to: "/fontaneros" },
    { label: "Bombas", icon: <WashingMachine />, to: "/bombas" },
    { label: "Calendario", icon: <CalendarDays />, to: "/calendario" },
    { label: "Proyectos", icon: <BarChart2 />, to: "/proyectos" },
];

const secondarylinksArray = [
    { label: "Configuración", icon: <Settings />, to: "/null" },
    { label: "Salir", icon: <LogOut />, to: "/null" },
];