import { useAuthStore } from '@/store/storeLogin';
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
    element: JSX.Element;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
    const { user } = useAuthStore();  // Obtener el estado de autenticación desde el store
    const [isLoading, setIsLoading] = useState(true);  // Estado de carga inicial

    useEffect(() => {
        if (user !== null) {
            setIsLoading(false);  // Cambia el estado de carga cuando el usuario está listo
        }
    }, [user]);

    if (isLoading) {
        return <div>Cargando...</div>;  // O mostrar algún spinner mientras se carga el usuario
    }

    if (!user) {
        // Si no hay un usuario autenticado, redirigir a /login
        return <Navigate to="/login" replace />;
    }

    // Si el usuario está autenticado, renderizar la página protegida
    return element;
};