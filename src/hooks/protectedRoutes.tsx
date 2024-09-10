import { useAuthStore } from '@/store/storeLogin';
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Skeleton } from "@/components/ui/skeleton"
interface ProtectedRouteProps {
    element: JSX.Element;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
    const { user } = useAuthStore();  // Obtener el estado de autenticación desde el store
    const [isLoading, setIsLoading] = useState(true);  // Estado de carga inicial

    useEffect(() => {
        // console.log(user);
        if (user !== null) {
            setIsLoading(false);  // Cambia el estado de carga cuando el usuario está listo
        }
    }, [user]);

    if (isLoading) {
        return (
            <div className="flex h-screen justify-center flex-col  items-center space-y-3">
                <Skeleton className="h-[225px] w-[550px] rounded-xl" />
                <div className="space-y-2 flex flex-col">
                    <Skeleton className="h-4 w-[250px]" />
                    <Skeleton className="h-4 w-[200px]" />
                </div>
            </div>
        )

        // O mostrar algún spinner mientras se carga el usuario
    }

    if (!user || user === null) {
        // Si no hay un usuario autenticado, redirigir a /login
        return <Navigate to="/login" replace />;
    }
    // Si el usuario está autenticado, renderizar la página protegida
    return element;
};
