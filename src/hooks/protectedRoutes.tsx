// import { useAuthStore } from '@/store/storeLogin';
// import { useEffect, useState } from 'react';
// import { Navigate } from 'react-router-dom';
// import { Skeleton } from "@/components/ui/skeleton"
// interface ProtectedRouteProps {
//     element: JSX.Element;
// }

// export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
//     const { user } = useAuthStore();  
//     const [isLoading, setIsLoading] = useState(true);  

//     useEffect(() => {

//         if (user !== null) {
//             setIsLoading(false);  
//         }
//     }, [user]);

//     if (isLoading) {
//         return (
//             <div className="flex h-screen justify-center flex-col  items-center space-y-3">
//                 <Skeleton className="h-[225px] w-[550px] rounded-xl" />
//                 <div className="space-y-2 flex flex-col">
//                     <Skeleton className="h-4 w-[250px]" />
//                     <Skeleton className="h-4 w-[200px]" />
//                 </div>
//             </div>
//         )


//     }

//     if (!user || user === null) {

//         return <Navigate to="/login" replace />;
//     }

//     return element;
// };



import { useAuthStore } from '@/store/storeLogin';
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Skeleton } from "@/components/ui/skeleton";

interface ProtectedRouteProps {
    element: JSX.Element;
    allowedRoles: string[];  // Añadimos los roles permitidos como una propiedad
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element, allowedRoles }) => {
    const { user } = useAuthStore();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (user !== null) {
            setIsLoading(false);
        }
    }, [user]);

    if (isLoading) {
        return (
            <div className="flex h-screen justify-center flex-col items-center space-y-3">
                <Skeleton className="h-[225px] w-[550px] rounded-xl" />
                <div className="space-y-2 flex flex-col">
                    <Skeleton className="h-4 w-[250px]" />
                    <Skeleton className="h-4 w-[200px]" />
                </div>
            </div>
        );
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (!user.role || !allowedRoles.includes(user.role)) {
        // Redirigir a una página de error si el usuario no tiene permiso
        return <Navigate to="/not-authorized" replace />;
    }

    return element;
};
