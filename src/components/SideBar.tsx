import { useState } from "react";

export default function SideBar() {
    const [isExpanded, setIsExpanded] = useState<boolean>(false);

    const toggleSidebar = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div className={`fixed top-0 left-0 h-full bg-gray-800 transition-all duration-300 ${isExpanded ? 'w-64' : 'w-16'}`}>
            <button
                onClick={toggleSidebar}
                className="bg-gray-700 text-white p-2 w-full text-left"
            >
                {isExpanded ? '◀' : '▶'}
            </button>
            <nav className={`mt-4 ${isExpanded ? 'block' : 'hidden'}`}>
                <ul className="space-y-4 text-white">
                    <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer">Inicio</li>
                    <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer">Perfil</li>
                    <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer">Configuración</li>
                    <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer">Ayuda</li>
                </ul>
            </nav>
        </div>
    );
}
