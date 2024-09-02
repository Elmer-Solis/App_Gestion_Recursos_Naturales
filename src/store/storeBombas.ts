import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { Bomba, DraftBomba } from '../types/index';
import { v4 as uuidv4 } from 'uuid'






type bombaState = {
    bombas: Bomba[]
    activeId: Bomba['id']
    addBomba: (data: DraftBomba) => void
    deleteBomba: (id: Bomba['id']) => void
    getBombaById: (id: Bomba['id']) => void //para editar
    updateBomba: (data: DraftBomba) => void //para editar
}

const createBomba = (bomba: DraftBomba): Bomba => {
    return { ...bomba, id: uuidv4() };
};


export const useBombaStore = create<bombaState>()(
    devtools(

        (set) => ({
            bombas: [],

            activeId: '',

            addBomba: (data) => {
                const newFontanero = createBomba(data)
                set((state) => ({
                    bombas: [...state.bombas, newFontanero]
                }))
            },

            deleteBomba: (id) => {
                set((state) => ({
                    bombas: state.bombas.filter(bomba => bomba.id !== id)
                }))
            },

            getBombaById: (id) => {
                set(() => ({
                    activeId: id
                }))
            },

            updateBomba: (data) => {
                set((state) => ({
                    bombas: state.bombas.map(bomba => bomba.id === state.activeId ?
                        { id: state.activeId, ...data } : bomba),
                    activeId: ''
                }))
            }

        })
    ))
