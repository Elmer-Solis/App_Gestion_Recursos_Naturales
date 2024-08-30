import React from "react";
import {
    ArrowLeft,
    Home,
    Building,
    Settings,
    BarChart2,
    LogOut,
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
        <div className="relative">
            <button
                className={`absolute top-5 transform ${sidebarOpen ? "right-[-16px]" : "right-[-26px] rotate-180"
                    } w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center transition-all duration-300`}
                onClick={toggleSidebar}
                aria-label={sidebarOpen ? "Cerrar sidebar" : "Abrir sidebar"}
                style={{ zIndex: 1000 }}
            >
                <ArrowLeft />
            </button>

            <aside
                className={`bg-gray-800 text-white transition-all duration-300 ${sidebarOpen ? "w-44" : "w-18"
                    } h-full`}
                aria-label="Sidebar"
            >
                <div className="flex justify-center items-center mb-5">
                    <div className="transform transition-transform">
                        <img
                            src="/react.svg"
                            alt="Logo"
                            className={`${sidebarOpen ? "scale-75" : "scale-150"
                                } transition-transform`}
                        />
                    </div>
                    {sidebarOpen && <h1 className="text-lg">codigo369</h1>}
                </div>


                <nav>
                    <ul>
                        {linksArray.map(({ icon, label, to }) => (
                            <li className="my-2 px-4" key={label}>
                                <NavLink
                                    to={to}
                                    className={({ isActive }) =>
                                        `flex items-center p-2 rounded ${isActive ? "bg-gray-700" : ""
                                        } hover:bg-gray-600 transition-colors`
                                    }
                                    aria-label={label}
                                >
                                    <span className="text-xl">{icon}</span>
                                    {sidebarOpen && <span className="ml-3">{label}</span>}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </nav>
                <hr className="my-4 border-gray-600" />
                <nav>
                    <ul>
                        {secondarylinksArray.map(({ icon, label, to }) => (
                            <li className="my-2 px-4" key={label}>
                                <NavLink
                                    to={to}
                                    className={({ isActive }) =>
                                        `flex items-center p-2 rounded ${isActive ? "bg-gray-700" : ""
                                        } hover:bg-gray-600 transition-colors`
                                    }
                                    aria-label={label}
                                >
                                    <span className="text-xl">{icon}</span>
                                    {sidebarOpen && <span className="ml-3">{label}</span>}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </nav>
                <hr className="my-4 border-gray-600" />
            </aside>
        </div>
    );
};

// Data links
const linksArray = [
    { label: "Home", icon: <Home />, to: "/" },
    { label: "Estadísticas", icon: <BarChart2 />, to: "/estadisticas" },
    { label: "Productos", icon: <Building />, to: "/productos" },
    { label: "Diagramas", icon: <BarChart2 />, to: "/diagramas" },
    { label: "Reportes", icon: <BarChart2 />, to: "/reportes" },
];

const secondarylinksArray = [
    { label: "Configuración", icon: <Settings />, to: "/null" },
    { label: "Salir", icon: <LogOut />, to: "/null" },
];
