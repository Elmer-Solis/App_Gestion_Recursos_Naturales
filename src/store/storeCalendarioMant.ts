import supabase from '@/supabase/supabase.config';
import { create } from 'zustand';

interface Mantenimiento {
    id: number;
    bombaId: number;
    fechaInicioMantenimiento: Date;
    fechaFinMantenimiento: Date;
    tipoMantenimiento: string[];
    titulo_mantenimiento: string; // Corregido: faltaba punto y coma
    notasMantenimiento?: string;
    costo?: number;
}

interface MantenimientoState {
    mantenimientos: Mantenimiento[];
    selectedMantenimiento: Mantenimiento | null;
    addMantenimiento: (mantenimiento: Omit<Mantenimiento, 'id'>) => Promise<void>;
    updateMantenimiento: (mantenimiento: Mantenimiento) => Promise<void>;
    deleteMantenimiento: (id: number) => Promise<void>;
    fetchMantenimientos: () => Promise<void>;
    setMantenimientos: (mantenimientos: Mantenimiento[]) => void;
    setSelectedMantenimiento: (mantenimiento: Mantenimiento | null) => void;
}

type MantenimientoRow = {
    id: number;
    bomba_id: number;
    fecha_iniciom: string; // Cambiado de fecha_inicioM a fecha_iniciom
    fecha_finm: string;    // Cambiado de fecha_finM a fecha_finm
    tipo_mantenimiento: string;
    titulo_mantenimiento: string;
    notas_mantenimiento?: string | null;
    costo?: number | null;
};

// Mapea los datos de Supabase al tipo `Mantenimiento` local
const mapRowToMantenimiento = (row: MantenimientoRow): Mantenimiento => ({
    id: row.id,
    bombaId: row.bomba_id,
    fechaInicioMantenimiento: new Date(row.fecha_iniciom),
    fechaFinMantenimiento: new Date(row.fecha_finm),
    titulo_mantenimiento: row.titulo_mantenimiento,
    tipoMantenimiento: row.tipo_mantenimiento.split(','), // Corregido: split(',')
    notasMantenimiento: row.notas_mantenimiento ?? undefined,
    costo: row.costo ?? undefined,
});

export const useMantenimientoStore = create<MantenimientoState>((set) => ({
    mantenimientos: [],
    selectedMantenimiento: null,

    // Obtener mantenimientos de Supabase
    fetchMantenimientos: async () => {
        const { data, error } = await supabase.from('mantenimiento_bombas').select('*');
        if (error) {
            console.error('Error obteniendo mantenimientos:', error.message);
            throw error;
        }
        const mantenimientos = data.map(mapRowToMantenimiento);
        set({ mantenimientos });
    },

    // Agregar nuevo mantenimiento en Supabase y actualizar el estado
    addMantenimiento: async (mantenimiento) => {
        const { error } = await supabase.from('mantenimiento_bombas').insert({
            bomba_id: mantenimiento.bombaId,
            fecha_iniciom: mantenimiento.fechaInicioMantenimiento.toISOString(),
            fecha_finm: mantenimiento.fechaFinMantenimiento.toISOString(),
            tipo_mantenimiento: mantenimiento.tipoMantenimiento.join(','), // Corregido: join(',')
            titulo_mantenimiento: mantenimiento.titulo_mantenimiento,
            notas_mantenimiento: mantenimiento.notasMantenimiento,
            costo: mantenimiento.costo,
        });
        if (error) {
            console.error('Error agregando mantenimiento:', error.message);
            throw error;
        }
        await useMantenimientoStore.getState().fetchMantenimientos(); // Refresca los mantenimientos después de la inserción
    },

    // Actualizar un mantenimiento en Supabase y en el estado
    updateMantenimiento: async (mantenimiento) => {
        const { error } = await supabase.from('mantenimiento_bombas')
            .update({
                bomba_id: mantenimiento.bombaId,
                fecha_iniciom: mantenimiento.fechaInicioMantenimiento.toISOString(),
                fecha_finm: mantenimiento.fechaFinMantenimiento.toISOString(),
                tipo_mantenimiento: mantenimiento.tipoMantenimiento.join(','), // Corregido: join(',')
                titulo_mantenimiento: mantenimiento.titulo_mantenimiento,
                notas_mantenimiento: mantenimiento.notasMantenimiento,
                costo: mantenimiento.costo,
            })
            .eq('id', mantenimiento.id);
        if (error) {
            console.error('Error actualizando mantenimiento:', error.message);
            throw error;
        }
        set((state) => ({
            mantenimientos: state.mantenimientos.map((m) => (m.id === mantenimiento.id ? mantenimiento : m)),
        }));
    },

    // Eliminar un mantenimiento en Supabase y en el estado
    deleteMantenimiento: async (id) => {
        const { error } = await supabase.from('mantenimiento_bombas').delete().eq('id', id);
        if (error) {
            console.error('Error eliminando mantenimiento:', error.message);
            throw error;
        }
        set((state) => ({
            mantenimientos: state.mantenimientos.filter((mantenimiento) => mantenimiento.id !== id),
        }));
    },

    setMantenimientos: (mantenimientos) => set({ mantenimientos }),
    setSelectedMantenimiento: (mantenimiento) => set({ selectedMantenimiento: mantenimiento }),
}));
