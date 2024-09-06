import { create } from 'zustand';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '@/supabase/supabase.config';
import { Session, User } from '@supabase/supabase-js';

// Definición del tipo para el estado de autenticación
interface AuthState {
    user: User | null;
    handleSignInWithGoogle: () => Promise<void>;
    signOut: () => Promise<void>;
    setUser: (user: User | null) => void;
}

// Creación del store con Zustand
export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    setUser: (user: User | null) => set({ user }),

    handleSignInWithGoogle: async () => {
        try {
            const { data, error } = await supabase.auth.signInWithOAuth({
                provider: 'google',
            });
            if (error) throw new Error("Ha ocurrido un error durante la autenticación");

            return data;

        } catch (error) {
            console.log(error); // Manejo del error en la autenticación
        }
    },

    signOut: async () => {
        const { error } = await supabase.auth.signOut();
        if (error) throw new Error('Ha ocurrido un error durante el cierre de sesión');
    },
}));

// Hook para gestionar la autenticación y sus efectos
// export const useAuth = () => {
//     const { setUser } = useAuthStore();
//     const navigate = useNavigate();

//     useEffect(() => {
//         const checkSession = async () => {
//             const { data: { session } } = await supabase.auth.getSession();
//             if (session) {
//                 setUser(session.user);
//             }
//         };

//         checkSession();

//         const { data: authListener } = supabase.auth.onAuthStateChange(
//             async (event, session: Session | null) => {
//                 if (session === null) {
//                     navigate('/login', { replace: true });
//                 } else {
//                     setUser(session.user);
//                     navigate('/', { replace: true });
//                 }
//             }
//         );

//         return () => {
//             authListener?.subscription?.unsubscribe();
//         };
//     }, [setUser, navigate]);

//     return useAuthStore();
// };