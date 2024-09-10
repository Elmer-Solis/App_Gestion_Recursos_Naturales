import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/storeLogin';

const INACTIVITY_LIMIT = 1 * 60 * 1000; // 1 minutos de inactividad

export const useInactivityLogout = () => {
    const navigate = useNavigate();
    const signOut = useAuthStore((state) => state.signOut);

    useEffect(() => {
        let inactivityTimer: NodeJS.Timeout;

        const resetTimer = () => {
            clearTimeout(inactivityTimer);
            inactivityTimer = setTimeout(handleInactivity, INACTIVITY_LIMIT);
        };

        const handleInactivity = async () => {
            await signOut();
            navigate('/login', { replace: true });
        };

        window.addEventListener('mousemove', resetTimer);
        window.addEventListener('keypress', resetTimer);

        resetTimer(); // Iniciar el temporizador al cargar el componente

        return () => {
            clearTimeout(inactivityTimer);
            window.removeEventListener('mousemove', resetTimer);
            window.removeEventListener('keypress', resetTimer);
        };
    }, [signOut, navigate]);
};