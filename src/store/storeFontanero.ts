import { create } from "zustand";
import { devtools } from "zustand/middleware";
import supabase from "@/supabase/supabase.config";
import { v4 as uuidv4 } from 'uuid';

export type Fontanero = {
    id: string
    name: string
    phone: string
    bomba: string
    renglon: string
}

export type DraftFontanero = Omit<Fontanero, 'id'>

// Tipo de Row de Supabase
type Row = {
    id: number;
    nombre: string;
    telefono: string;
    bomba_id: number | null;
    renglon: string
};

type fontaneroState = {
    fontaneros: Fontanero[];
    activeId: Fontanero['id'];
    addFontanero: (data: DraftFontanero) => Promise<void>;
    deleteFontanero: (id: Fontanero['id']) => Promise<void>;
    getFontaneroById: (id: Fontanero['id']) => void;
    updateFontanero: (data: DraftFontanero) => Promise<void>;
    fetchFontaneros: () => Promise<void>;
};

// Mapeo de Row (Supabase) a Fontanero (local)
const mapRowToFontanero = (row: Row): Fontanero => ({
    id: row.id.toString(),
    name: row.nombre,
    phone: row.telefono || '',
    bomba: row.bomba_id?.toString() || '',
    renglon: row.renglon
});

export const useFontaneroStore = create<fontaneroState>()(
    devtools(
        (set, get) => ({

            fontaneros: [],
            activeId: '',

            // Fetch fontaneros de Supabase
            fetchFontaneros: async () => {
                const { data, error } = await supabase.from('fontaneros').select('*');
                if (error) {
                    console.error('Error obteniendo fontaneros', error.message);
                    throw error;
                }

                const fontanerosMapped = (data as Row[]).map(mapRowToFontanero);
                set({ fontaneros: fontanerosMapped });
            },

            // Añadir nuevo fontanero
            addFontanero: async (data: DraftFontanero) => {
                const newFontanero = { ...data, id: uuidv4() };

                const { error } = await supabase.from('fontaneros').insert([{
                    nombre: newFontanero.name,
                    telefono: newFontanero.phone,
                    bomba_id: newFontanero.bomba ? parseInt(newFontanero.bomba) : null,
                    renglon: newFontanero.renglon
                }]);

                if (error) {
                    console.error('Error agregando fontanero a Supabase', error.message);
                    throw error;
                }

                set((state) => ({
                    fontaneros: [...state.fontaneros, newFontanero]
                }));
            },

            // Eliminar fontanero
            deleteFontanero: async (id: Fontanero['id']) => {
                const { error } = await supabase.from('fontaneros').delete().eq('id', parseInt(id));
                if (error) {
                    console.error('Error eliminando fontanero de Supabase', error.message);
                    throw error;
                }

                set((state) => ({
                    fontaneros: state.fontaneros.filter((fontanero) => fontanero.id !== id)
                }));
            },

            // Obtener fontanero por ID
            getFontaneroById: (id: Fontanero['id']) => {
                set({ activeId: id });
            },

            // Actualizar fontanero
            updateFontanero: async (data: DraftFontanero) => {
                const { error } = await supabase
                    .from('fontaneros')
                    .update({
                        nombre: data.name,
                        telefono: data.phone,
                        bomba_id: data.bomba ? parseInt(data.bomba) : null,
                        renglon: data.renglon
                    })
                    .eq('id', parseInt(get().activeId));

                if (error) {
                    console.error('Error actualizando fontanero en Supabase', error.message);
                    throw error;
                }

                set((state) => ({
                    fontaneros: state.fontaneros.map((fontanero) =>
                        fontanero.id === get().activeId ? { ...fontanero, ...data } : fontanero
                    )
                }));
            },
        })
    )
);
