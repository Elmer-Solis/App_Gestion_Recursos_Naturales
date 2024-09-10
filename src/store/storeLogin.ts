import { create } from 'zustand';
import supabase from '@/supabase/supabase.config';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { persist } from 'zustand/middleware';
import { useToast } from '@/hooks/use-toast';

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
        }
    )
);

export const useAuth = () => {
    const navigate = useNavigate();
    const setUser = useAuthStore((state) => state.setUser);
    const { toast } = useToast()
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
                    toast({
                        variant: 'delete',
                        title: "Error de Autenticación",
                        description: "El correo ingresado no está autorizado",
                    })
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
                navigate("/login");
            }
        };
        checkSession();
    }, [setUser, navigate]);
};