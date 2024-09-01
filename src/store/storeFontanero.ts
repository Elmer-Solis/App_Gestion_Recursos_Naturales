import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { Fontanero, DraftFontanero } from '../types/index';
import { v4 as uuidv4 } from 'uuid'

type FontaneroState = {
    fontaneros: Fontanero[]
    addFontanero: (data: DraftFontanero) => void
}

const createFontanero = (fontanero: DraftFontanero): Fontanero => {
    // console.log(fontanero);
    return { ...fontanero, id: uuidv4() }
}


export const useFontaneroStore = create<FontaneroState>()(
    devtools(
        (set) => ({
            fontaneros: [],

            addFontanero: (data) => {
                const newFontanero = createFontanero(data)
                set((state) => ({

                    fontaneros: [...state.fontaneros, newFontanero]

                }))
            },


        })
    ))
