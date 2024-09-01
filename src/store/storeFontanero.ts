import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { Fontanero, DraftFontanero } from '../types/index';
import { v4 as uuidv4 } from 'uuid'

type FontaneroState = {
    fontaneros: Fontanero[]
    activeId: Fontanero['id']
    addFontanero: (data: DraftFontanero) => void
    deleteFontanero: (id: Fontanero['id']) => void
    getFontaneroById: (id: Fontanero['id']) => void //para editar
    updateFontanero: (data: DraftFontanero) => void //para editar
}

const createFontanero = (fontanero: DraftFontanero): Fontanero => {
    // console.log(fontanero);
    return { ...fontanero, id: uuidv4() }
}


export const useFontaneroStore = create<FontaneroState>()(
    devtools(

        (set) => ({
            fontaneros: [],

            activeId: '',

            addFontanero: (data) => {
                const newFontanero = createFontanero(data)
                set((state) => ({
                    fontaneros: [...state.fontaneros, newFontanero]
                }))
            },

            deleteFontanero: (id) => {
                set((state) => ({
                    fontaneros: state.fontaneros.filter(fontanero => fontanero.id !== id)
                }))
            },

            getFontaneroById: (id) => {
                set(() => ({
                    activeId: id
                }))
            },

            updateFontanero: (data) => {
                set((state) => ({
                    fontaneros: state.fontaneros.map(fontanero => fontanero.id === state.activeId ?
                        { id: state.activeId, ...data } : fontanero),
                    activeId: ''
                }))
            }

        })
    ))
