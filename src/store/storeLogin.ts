import { create } from 'zustand';
import supabase from '@/supabase/supabase.config';


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
export const useAuthStore = create<AuthState>((set) => ({
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
            console.log(error); // Manejo del error en la autenticación
        }
    },

    signOut: async () => {
        const { error } = await supabase.auth.signOut();
        if (error) throw new Error('Ha ocurrido un error durante el cierre de sesión');
    },
}));

