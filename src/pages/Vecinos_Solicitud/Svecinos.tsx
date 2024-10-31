import { useState, useEffect } from "react";
import { SvecinosForm } from "./SvecinosForm";
import { SvecinosList } from "./SvecinosList";

export function SVecinos() {
    const [isMediumScreen, setIsMediumScreen] = useState(false);

    useEffect(() => {
        // Definir función para verificar el ancho de pantalla
        const checkScreenSize = () => {
            setIsMediumScreen(window.innerWidth >= 768); // 768px es el punto de quiebre `md`
        };

        checkScreenSize(); // Verificar inicialmente
        window.addEventListener("resize", checkScreenSize); // Escuchar cambios de tamaño

        // Limpiar el evento al desmontar
        return () => window.removeEventListener("resize", checkScreenSize);
    }, []);

    return (
        <div className="container mx-auto mt-4">
            <div className="mt-4 md:flex">
                {/* Mostrar solo en pantallas medianas o superiores */}
                {isMediumScreen && <SvecinosForm />}

                {/* Mostrar la lista en todas las pantallas */}
                <SvecinosList />
            </div>
        </div>
    );
}