import { create } from "zustand";
import { devtools } from "zustand/middleware";
import supabase from "@/supabase/supabase.config";
import { v4 as uuidv4 } from 'uuid';

// Definir tipos de datos para calidad_agua
export type CalidadAgua = {
    id: string;
    bomba_id: string;
    fecha_inspeccion: string; // Fecha en formato ISO (string)
    nivel_ph: number;
    nivel_cloro: number;
    otras_metricas: string;
};

export type DraftCalidadAgua = Omit<CalidadAgua, 'id'>;
// Tipo de Row de Supabase para calidad_agua
type CalidadAguaRow = {
    id: number;
    bomba_id: number;
    fecha_inspeccion: string;
    nivel_ph: number;
    nivel_cloro: number;
    otras_metricas: string;
};

// Estado para calidad de agua
type CalidadAguaState = {
    registrosCalidad: CalidadAgua[];
    activeCalidadId: CalidadAgua['id'];
    addCalidad: (data: DraftCalidadAgua) => Promise<void>;
    deleteCalidad: (id: CalidadAgua['id']) => Promise<void>;
    getCalidadById: (id: CalidadAgua['id']) => void;
    updateCalidad: (data: DraftCalidadAgua) => Promise<void>;
    fetchCalidad: () => Promise<void>;
    setActiveCalidadId: (id: string) => void;
};

// Mapeo de row de Supabase a nuestra estructura interna
const mapRowToCalidadAgua = (row: CalidadAguaRow): CalidadAgua => ({
    id: row.id.toString(),
    bomba_id: row.bomba_id.toString(),
    fecha_inspeccion: row.fecha_inspeccion,
    nivel_ph: row.nivel_ph,
    nivel_cloro: row.nivel_cloro,
    otras_metricas: row.otras_metricas,
});

export const useCalidadAguaStore = create<CalidadAguaState>()(

    devtools(
        (set, get) => ({
            registrosCalidad: [],
            activeCalidadId: '',

            // Fetch registros de calidad de agua de Supabase
            fetchCalidad: async () => {
                const { data, error } = await supabase.from('calidad_agua').select('*');
                if (error) {
                    console.error('Error obteniendo registros de calidad de agua', error.message);
                    throw error;
                }
                const calidadMapped = (data as CalidadAguaRow[]).map(mapRowToCalidadAgua);
                set({ registrosCalidad: calidadMapped });
            },

            // Añadir nuevo registro de calidad de agua
            addCalidad: async (data: DraftCalidadAgua) => {
                const newCalidad = { ...data, id: uuidv4() };

                const { error } = await supabase.from('calidad_agua').insert([{
                    bomba_id: parseInt(newCalidad.bomba_id),
                    fecha_inspeccion: newCalidad.fecha_inspeccion,
                    nivel_ph: newCalidad.nivel_ph,
                    nivel_cloro: newCalidad.nivel_cloro,
                    otras_metricas: newCalidad.otras_metricas,
                }]);

                if (error) {
                    console.error('Error agregando registro de calidad de agua a Supabase', error.message);
                    throw error;
                }

                set((state) => ({
                    registrosCalidad: [...state.registrosCalidad, newCalidad]
                }));
            },

            // Eliminar registro de calidad de agua
            deleteCalidad: async (id: CalidadAgua['id']) => {
                const { error } = await supabase.from('calidad_agua').delete().eq('id', parseInt(id));
                if (error) {
                    console.error('Error eliminando registro de calidad de agua de Supabase', error.message);
                    throw error;
                }

                set((state) => ({
                    registrosCalidad: state.registrosCalidad.filter((calidad) => calidad.id !== id)
                }));
            },

            // Obtener calidad por ID
            getCalidadById: (id: CalidadAgua['id']) => {
                set({ activeCalidadId: id });
            },

            // Actualizar registro de calidad de agua
            updateCalidad: async (data: DraftCalidadAgua) => {
                const { error } = await supabase
                    .from('calidad_agua')
                    .update({
                        bomba_id: parseInt(data.bomba_id),
                        fecha_inspeccion: data.fecha_inspeccion,
                        nivel_ph: data.nivel_ph,
                        nivel_cloro: data.nivel_cloro,
                        otras_metricas: data.otras_metricas,
                    })
                    .eq('id', parseInt(get().activeCalidadId));

                if (error) {
                    console.error('Error actualizando registro de calidad de agua en Supabase', error.message);
                    throw error;
                }

                set((state) => ({
                    registrosCalidad: state.registrosCalidad.map((calidad) =>
                        calidad.id === get().activeCalidadId ? { ...calidad, ...data } : calidad
                    )
                }));
            },

            // Asignar o limpiar activeCalidadId
            setActiveCalidadId: (id: string) => set({ activeCalidadId: id }),
        })
    )
);
