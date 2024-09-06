import supabase from "@/supabase/supabase.config";
import { createContext, useState, ReactNode, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Session, User } from "@supabase/supabase-js";

// Definición del tipo para el contexto de autenticación
interface AuthContextType {
    handleSignInWithGoogle: () => Promise<void>;
    signOut: () => Promise<void>;
    user: User | null;
}

// Creación del contexto de autenticación
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Definición del tipo de props para el proveedor del contexto
interface AuthContextProviderProps {
    children: ReactNode;
}

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {

    const navigate = useNavigate();
    const [user, setUser] = useState<User | null>(null); // Estado para almacenar el usuario autenticado

    // Función para iniciar sesión con Google
    async function handleSignInWithGoogle() {
        try {
            const { data, error } = await supabase.auth.signInWithOAuth({
                provider: 'google',
            });
            if (error) throw new Error("Ha ocurrido un error durante la autenticación");

            return data;

        } catch (error) {
            console.log(error); // Manejo del error en la autenticación
        }
    }

    // Función para cerrar sesión
    async function signOut() {
        const { error } = await supabase.auth.signOut();

        if (error) throw new Error("Ha ocurrido un error durante el cierre de sesión");
    }

    // Hook para escuchar cambios en el estado de autenticación
    useEffect(() => {
        const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session: Session | null) => {
            console.log('supabase session:', event); // Monitoreo del evento de autenticación
            console.log(session);
            if (session === null) {
                navigate('/login', { replace: true }); // Redirigir si no hay sesión
            } else {
                setUser(session.user); // Actualizar el estado con el usuario autenticado
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
        // Proveedor del contexto de autenticación
        <AuthContext.Provider value={{ handleSignInWithGoogle, signOut, user }}>
            {children}
        </AuthContext.Provider>
    );
};
export const UserAuth = () => useContext(AuthContext); 
