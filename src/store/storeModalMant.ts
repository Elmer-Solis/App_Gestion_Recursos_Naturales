import { create } from 'zustand';

interface UiState {
    isMaintOpen: boolean;
    openMaint: () => void;
    closeMaint: () => void;
}

export const useMantenimiento = create<UiState>((set) => ({
    // Estado inicial
    isMaintOpen: false,

    // Método para abrir el modal de mantenimiento
    openMaint: () => set({ isMaintOpen: true }),

    // Método para cerrar el modal de mantenimiento
    closeMaint: () => set({ isMaintOpen: false }),
}));
