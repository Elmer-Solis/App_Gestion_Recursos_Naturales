import { Outlet } from "react-router-dom";
import { useState } from "react";
import { Sidebar } from "./SideBar";
import { useAuth } from "@/store/storeLogin";
// import { useInactivityLogout } from "@/hooks/useInactivityLogout";
import { Menu } from "lucide-react";

export default function MainLayout() {
  const [isAsideExpanded, setIsAsideExpanded] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleAside = () => setIsAsideExpanded(!isAsideExpanded);
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  useAuth();
  // useInactivityLogout();

  return (
    <div className="grid h-screen w-full grid-cols-[auto_1fr]">
      {/* Sidebar visible en escritorio y como menú hamburguesa en móvil */}
      <aside
        className={`shadow-md ${isMobileMenuOpen ? "fixed inset-0 z-20 w-full" : "hidden md:block"
          }`}
      >
        <Sidebar
          sidebarOpen={isAsideExpanded || isMobileMenuOpen}
          setSidebarOpen={toggleAside}
          closeMobileMenu={() => setIsMobileMenuOpen(false)}
        />
      </aside>

      <div className="flex flex-col w-full">
        {/* Header: oculto en pantallas pequeñas */}
        {/* <header className="sticky top-0 z-10 w-full shadow-md hidden md:block">
                    <Header />
                </header> */}

        {/* Botón menú hamburguesa visible solo en móvil */}
        <button
          className="absolute top-4 right-4 md:hidden z-30"
          onClick={toggleMobileMenu}
        >
          <Menu className="w-6 h-6" />
        </button>

        {/* Contenido principal */}
        <main className="flex-grow p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
