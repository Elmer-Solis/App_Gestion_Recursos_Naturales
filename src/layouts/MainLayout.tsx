import { Header } from "./Header"
import { Outlet, useNavigate } from "react-router-dom"
import { useEffect, useState } from 'react';
import { Sidebar } from "./SideBar";
import { useAuthStore } from "@/store/storeLogin";
import supabase from "@/supabase/supabase.config";
import { Session } from "@supabase/supabase-js";

export default function MainLayout() {
    const { setUser } = useAuthStore();
    const navigate = useNavigate();

    const [isAsideExpanded, setIsAsideExpanded] = useState(true);


    const toggleAside = () => {
        setIsAsideExpanded(!isAsideExpanded);
    };

    interface UserMetadata {
        email: string;
        picture: string;
        name: string;
        // Agrega otros campos que necesites aquí
    }


    useEffect(() => {
        const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session: Session | null) => {
            console.log('supabase session:', event); // Monitoreo del evento de autenticación

            if (session === null) {
                navigate('/login', { replace: true }); // Redirigir si no hay sesión
            } else {
                const userMetadata: UserMetadata = {
                    email: session.user?.email || '',
                    picture: session.user?.user_metadata?.picture || '',
                    name: session.user?.user_metadata?.name || '',
                };
                setUser(userMetadata);
                console.log('datos', session.user);
                console.log("Datos del usuario:", session?.user.user_metadata);
                navigate('/', { replace: true }); // Redirigir a la página principal
            }
        });
        // Limpieza del listener al desmontar el componente
        return () => {
            authListener?.subscription?.unsubscribe();
        };
    }, []);


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

                <main className="flex-grow p-4 bg-main ">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}






