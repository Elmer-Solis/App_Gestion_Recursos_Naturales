import { create } from 'zustand';
import supabase from '@/supabase/supabase.config';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { persist } from 'zustand/middleware';

interface UserMetadata {
    email: string;
    picture: string
    name: string;
    // Agrega otros campos que necesites aquí
}

// Definición del tipo para el estado de autenticación
interface AuthState {
    user: UserMetadata | null;
    handleSignInWithGoogle: () => Promise<{ provider: string; url: string } | undefined>;
    signOut: () => Promise<void>;
    setUser: (user: UserMetadata | null) => void;
}

// Creación del store con Zustand
export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            setUser: (user: UserMetadata | null) => set({ user }),

            handleSignInWithGoogle: async () => {
                try {
                    const { data, error } = await supabase.auth.signInWithOAuth({
                        provider: 'google',
                    });
                    if (error) throw new Error("Ha ocurrido un error durante la autenticación");
                    return data;
                } catch (error) {
                    console.log(error);
                }
            },

            signOut: async () => {
                try {
                    const { error } = await supabase.auth.signOut();
                    if (error) throw new Error('Ha ocurrido un error durante el cierre de sesión');

                    // Limpiar el estado y `localStorage`
                    useAuthStore.getState().setUser(null);
                    localStorage.removeItem('auth-storage');
                } catch (error) {
                    console.log(error);
                }
            }


        }),
        {
            name: 'auth-storage',
            getStorage: () => localStorage,
        }
    )
);


export const useAuth = () => {
    const navigate = useNavigate();
    const setUser = useAuthStore((state) => state.setUser);
    // useEffect(() => {
    //     const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session: Session | null) => {
    //         console.log('supabase session:', event); // Monitoreo del evento de autenticación

    //         if (session === null) {
    //             navigate('/login', { replace: true }); // Redirigir si no hay sesión
    //         } else {
    //             const email = session.user?.email || '';

    //             // Realizar consulta en la tabla "users" de Supabase
    //             const { data, error } = await supabase
    //                 .from('users')
    //                 .select('*')
    //                 .eq('email', email);

    //             // Verificar si el correo existe en la base de datos
    //             if (error || data.length === 0) {
    //                 // Cerrar sesión si el email no está autorizado
    //                 await supabase.auth.signOut();
    //                 navigate('/login', { replace: true });
    //                 // alert('Acces no autorizado');
    //             } else {
    //                 // Si el correo está autorizado, permitir el acceso
    //                 const userMetadata: UserMetadata = {
    //                     email: email,
    //                     picture: session.user?.user_metadata?.picture || '',
    //                     name: session.user?.user_metadata?.name || '',
    //                 };
    //                 setUser(userMetadata);
    //                 console.log('datos', session.user);
    //                 console.log("Datos del usuario:", session?.user.user_metadata);
    //                 // navigate('/', { replace: true }); // Redirigir a la página principal
    //             }
    //         }
    //     });

    //     // Limpieza del listener al desmontar el componente
    //     return () => {
    //         authListener?.subscription?.unsubscribe();
    //     };
    // }, []);
    useEffect(() => {
        const checkSession = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (session) {
                const email = session.user?.email || '';
                const { data, error } = await supabase
                    .from('users')
                    .select('*')
                    .eq('email', email);

                if (error || data.length === 0) {
                    await supabase.auth.signOut();
                    useAuthStore.getState().setUser(null);
                    localStorage.removeItem('auth-storage');
                    navigate('/login', { replace: true });
                } else {
                    const userMetadata: UserMetadata = {
                        email: email,
                        picture: session.user?.user_metadata?.picture || '',
                        name: session.user?.user_metadata?.name || '',
                    };
                    setUser(userMetadata);
                }
            } else {
                setUser(null);
            }
        };

        checkSession();
    }, [setUser, navigate]);

};
