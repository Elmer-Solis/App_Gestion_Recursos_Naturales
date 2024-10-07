import { create } from 'zustand';

interface UiState {
    isDateModalOpen: boolean;
    openDateModal: () => void;
    closeDateModal: () => void;
}

export const useUiStore = create<UiState>((set) => ({
    // Estado inicial
    isDateModalOpen: false,

    // Método para abrir el modal
    openDateModal: () => set({ isDateModalOpen: true }),

    // Método para cerrar el modal
    closeDateModal: () => set({ isDateModalOpen: false }),

}));

