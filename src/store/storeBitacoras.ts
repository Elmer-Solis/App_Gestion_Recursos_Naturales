import { create } from "zustand";
import { devtools } from "zustand/middleware";
import supabase from "@/supabase/supabase.config";
import { v4 as uuidv4 } from 'uuid';

// Tipos de datos actualizados con los nuevos campos
export type BitacoraTomas = {
    id: string;
    zona_distribucion: string;
    total_tomas: number;
    tomas_usadas: number;
    tomas_legales: number;
    latitud: string;
    longitud: string;
    fecha_registro: string; // Fecha en formato ISO (string)
    fontanero_id: string | null;
    notas: string;
};

export type DraftBitacoraTomas = Omit<BitacoraTomas, 'id'>;

// Tipo de Row de Supabase (Bitácora de tomas)
type BitacoraRow = {
    id: number;
    zona_distribucion: string;
    total_tomas: number;
    tomas_usadas: number;
    tomas_legales: number;
    latitud: string;
    longitud: string;
    fecha_registro: string; // Supabase devuelve fechas como strings
    fontanero_id: number | null;
    notas: string;
};

// Estado para la bitácora de tomas
type bitacoraTomasState = {
    bitacoras: BitacoraTomas[];
    activeBitacoraId: BitacoraTomas['id'];
    addBitacora: (data: DraftBitacoraTomas) => Promise<void>;
    deleteBitacora: (id: BitacoraTomas['id']) => Promise<void>;
    getBitacoraById: (id: BitacoraTomas['id']) => void;
    updateBitacora: (data: DraftBitacoraTomas) => Promise<void>;
    fetchBitacoras: () => Promise<void>;
    setActiveBitacoraId: (id: string) => void;
};

// Mapeo de row de Supabase a nuestra estructura interna
const mapRowToBitacora = (row: BitacoraRow): BitacoraTomas => ({
    id: row.id.toString(),
    zona_distribucion: row.zona_distribucion,
    total_tomas: row.total_tomas,
    tomas_usadas: row.tomas_usadas,
    tomas_legales: row.tomas_legales,
    latitud: row.latitud,
    longitud: row.longitud,
    fecha_registro: row.fecha_registro,
    fontanero_id: row.fontanero_id?.toString() || null,
    notas: row.notas,
});

export const useBitacoraTomasStore = create<bitacoraTomasState>()(
    devtools(
        (set, get) => ({
            bitacoras: [],
            activeBitacoraId: '',

            // Fetch bitácoras de tomas de Supabase
            fetchBitacoras: async () => {
                const { data, error } = await supabase.from('bitacora_tomas').select('*');
                if (error) {
                    console.error('Error obteniendo bitácoras de tomas', error.message);
                    throw error;
                }

                const bitacorasMapped = (data as BitacoraRow[]).map(mapRowToBitacora);
                set({ bitacoras: bitacorasMapped });
            },

            // Añadir nueva bitácora de tomas con los campos nuevos
            addBitacora: async (data: DraftBitacoraTomas) => {
                const newBitacora = { ...data, id: uuidv4() };

                const { error } = await supabase.from('bitacora_tomas').insert([{
                    zona_distribucion: newBitacora.zona_distribucion,
                    total_tomas: newBitacora.total_tomas,
                    tomas_usadas: newBitacora.tomas_usadas,
                    tomas_legales: newBitacora.tomas_legales,
                    latitud: newBitacora.latitud,
                    longitud: newBitacora.longitud,
                    fecha_registro: newBitacora.fecha_registro,
                    fontanero_id: newBitacora.fontanero_id ? parseInt(newBitacora.fontanero_id) : null,
                    notas: newBitacora.notas,
                }]);

                if (error) {
                    console.error('Error agregando bitácora de tomas a Supabase', error.message);
                    throw error;
                }

                set((state) => ({
                    bitacoras: [...state.bitacoras, newBitacora]
                }));
            },

            // Eliminar bitácora de tomas
            deleteBitacora: async (id: BitacoraTomas['id']) => {
                const { error } = await supabase.from('bitacora_tomas').delete().eq('id', parseInt(id));
                if (error) {
                    console.error('Error eliminando bitácora de tomas de Supabase', error.message);
                    throw error;
                }

                set((state) => ({
                    bitacoras: state.bitacoras.filter((bitacora) => bitacora.id !== id)
                }));
            },

            // Obtener bitácora por ID
            getBitacoraById: (id: BitacoraTomas['id']) => {
                set({ activeBitacoraId: id });
            },

            // Actualizar bitácora de tomas
            updateBitacora: async (data: DraftBitacoraTomas) => {
                const { error } = await supabase
                    .from('bitacora_tomas')
                    .update({
                        zona_distribucion: data.zona_distribucion,
                        total_tomas: data.total_tomas,
                        tomas_usadas: data.tomas_usadas,
                        tomas_legales: data.tomas_legales,
                        latitud: data.latitud,
                        longitud: data.longitud,
                        fecha_registro: data.fecha_registro,
                        fontanero_id: data.fontanero_id ? parseInt(data.fontanero_id) : null,
                        notas: data.notas,
                    })
                    .eq('id', parseInt(get().activeBitacoraId));

                if (error) {
                    console.error('Error actualizando bitácora de tomas en Supabase', error.message);
                    throw error;
                }

                set((state) => ({
                    bitacoras: state.bitacoras.map((bitacora) =>
                        bitacora.id === get().activeBitacoraId ? { ...bitacora, ...data } : bitacora
                    )
                }));
            },

            // Añadir la función para limpiar o modificar el activeBitacoraId
            setActiveBitacoraId: (id: string) => set({ activeBitacoraId: id }),
        })
    )
);
