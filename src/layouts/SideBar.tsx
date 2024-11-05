import { useState } from "react";
import {
  Home,
  LogOut,
  ChevronLeft,
  CalendarDays,
  Wrench,
  WashingMachine,
  UserPlus,
  Droplet,
  FileText,
  ChevronDown,
  Settings,
  FileLock
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { useAuthStore } from "../store/storeLogin";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  closeMobileMenu?: () => void; // Función opcional para cerrar el menú en móvil
}

export const Sidebar: React.FC<SidebarProps> = ({
  sidebarOpen,
  setSidebarOpen,
  closeMobileMenu,
}) => {
  const { signOut, user } = useAuthStore();
  const [isSubMenuOpen, setSubMenuOpen] = useState(false); // Estado para controlar el submenú

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };


  // Filtra las opciones de menú basadas en el rol del usuario
  const filteredLinks = linksArray.filter((link) =>
    link.roles.includes(user?.role || "")
  );



  return (
    <div
      className={`relative h-screen ${sidebarOpen ? "w-full md:w-auto" : "md:w-auto"
        } ${sidebarOpen && "bg-black bg-opacity-95 md:bg-opacity-0"}`}
    >
      <button
        className={`absolute top-5 transform ${sidebarOpen ? "right-[-16px]" : "right-[-26px] rotate-180"
          } w-8 h-8 rounded-full flex items-center justify-center transition-all duration-400`}
        onClick={toggleSidebar}
        style={{ zIndex: 1000 }}
      >
        <ChevronLeft />
      </button>

      <aside
        className={`border-r text-white transition-all duration-300 ${sidebarOpen ? "w-full md:w-44" : "w-18"
          } h-full flex flex-col`}
      >
        <div className="flex justify-center items-center pt-5 mb-5">
          <div className="transform transition-transform">
            <img
              src="/umgO.png"
              alt="Logo"
              className={`h-8 w-9 ${sidebarOpen ? "scale-90" : "scale-150"
                } transition-transform`}
            />
          </div>
          {sidebarOpen && (
            <h1 className="text-lg text-black dark:text-white">Gestión Agua</h1>
          )}
        </div>

        <nav className="flex-1 overflow-y-auto">
          <ul>
            {filteredLinks.map(({ icon, label, to, subMenu }) => (
              <li className="my-2" key={label}>
                <div className="flex items-center justify-between">
                  <NavLink
                    to={to}
                    className={({ isActive }) =>
                      `flex items-center p-2 ${sidebarOpen ? "px-6" : "px-2"
                      } rounded ${isActive ? "bg-gray-200 dark:bg-gray-800" : ""
                      } hover:bg-gray-400 dark:hover:bg-gray-700 transition-colors w-full`
                    }
                    onClick={closeMobileMenu}
                  >
                    <span className="text-xl text-gray-800 dark:text-gray-50 ml-2">
                      {icon}
                    </span>
                    {sidebarOpen && (
                      <span className="ml-3 text-gray-800 dark:text-gray-50">
                        {label}
                      </span>
                    )}
                  </NavLink>
                  {subMenu && sidebarOpen && (
                    <button
                      className="text-gray-800 dark:text-gray-50"
                      onClick={() => setSubMenuOpen(!isSubMenuOpen)}
                    >
                      <ChevronDown />
                    </button>
                  )}
                </div>

                {/* Renderiza el submenú si está abierto y filtra según el rol del usuario */}
                {subMenu && isSubMenuOpen && sidebarOpen && (
                  <ul className="ml-6">
                    {subMenu
                      .filter((subItem) => subItem.roles.includes(user?.role || ""))
                      .map(({ label: subLabel, to: subTo }) => (
                        <li key={subLabel} className="my-2">
                          <NavLink
                            to={subTo}
                            className={({ isActive }) =>
                              `flex items-center p-2 px-4 rounded ${isActive ? "bg-gray-200 dark:bg-gray-800" : ""
                              } hover:bg-gray-400 dark:hover:bg-gray-700 transition-colors w-full`
                            }
                          >
                            {subLabel}
                          </NavLink>
                        </li>
                      ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <hr className="border-gray-300 dark:border-gray-800" />

        <nav>
          <ul>
            <li className="my-8">
              <button
                onClick={() => {
                  signOut();
                  if (closeMobileMenu) {
                    closeMobileMenu();
                  }
                }}
                className="w-full flex items-center p-2 px-4 rounded hover:bg-gray-700 transition-colors"
              >
                <span className="text-xl text-gray-800 dark:text-blue-50">
                  <LogOut />
                </span>
                {sidebarOpen && (
                  <span className="ml-3 text-gray-800 dark:text-gray-50">
                    Salir
                  </span>
                )}
              </button>
            </li>
          </ul>
        </nav>
      </aside>
    </div>
  );
};

// Data links con submenú
// const linksArray = [
//   {
//     label: "Inicio",
//     icon: <Home />,
//     to: "/",
//     subMenu: [
//       { label: "Tablas", to: "/tablas" },
//       { label: "Contadores", to: "/contadores" },
//     ],
//   },
//   { label: "Calendario", icon: <CalendarDays />, to: "/calendario" },
//   // { label: "Vecinos", icon: <UserPlus />, to: "/solicitu" },
//   { label: "Vecinos", icon: <UserPlus />, to: "/solicitud" },
//   { label: "Calidad", icon: <Droplet />, to: "/calidad" },
//   { label: "Bitacoras", icon: <FileText />, to: "/bitacoras" },
//   { label: "Bombas", icon: <WashingMachine />, to: "/bombas" },
//   { label: "Fontaneros", icon: <Wrench />, to: "/fontaneros" },
//   { label: "Permisos", icon: <FileLock />, to: "/permisos" },
//   { label: "Ajustes", icon: <Settings />, to: "/settings" },
// ];

const linksArray = [
  {
    label: "Inicio",
    icon: <Home />,
    to: "/",
    roles: ["Superadmin", "Admin", "Fontanero"],
    subMenu: [
      { label: "Tablas", to: "/tablas", roles: ["Superadmin"] },
      { label: "Contadores", to: "/contadores", roles: ["Superadmin", "Admin"] },
    ],
  },
  { label: "Calendario", icon: <CalendarDays />, to: "/calendario", roles: ["Superadmin", "Admin", 'Fontanero'] },
  { label: "Vecinos", icon: <UserPlus />, to: "/solicitud", roles: ["Superadmin", "Admin", "Fontanero"] },
  { label: "Calidad", icon: <Droplet />, to: "/calidad", roles: ["Superadmin", "Admin"] },
  { label: "Bitacoras", icon: <FileText />, to: "/bitacoras", roles: ["Superadmin", "Admin"] },
  { label: "Bombas", icon: <WashingMachine />, to: "/bombas", roles: ["Superadmin", "Admin", "Fontanero"] },
  { label: "Fontaneros", icon: <Wrench />, to: "/fontaneros", roles: ["Superadmin", "Admin"] },
  { label: "Permisos", icon: <FileLock />, to: "/permisos", roles: ["Superadmin"] },
  { label: "Ajustes", icon: <Settings />, to: "/settings", roles: ["Superadmin"] },
];
