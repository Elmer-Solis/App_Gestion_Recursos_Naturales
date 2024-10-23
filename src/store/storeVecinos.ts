import supabase from '@/supabase/supabase.config';
import { create } from 'zustand';

// Interfaz para Solicitud de Trabajo
interface SolicitudTrabajo {
    id: number;
    vecinoNombre: string;
    direccionVecino: string;
    fechaSolicitud: Date;
    estadoSolicitud: string;
    tituloSolicitud: string;
    descripcionSolicitud?: string;
}

interface SolicitudTrabajoState {
    solicitudes: SolicitudTrabajo[];
    selectedSolicitud: SolicitudTrabajo | null;
    addSolicitud: (solicitud: Omit<SolicitudTrabajo, 'id'>) => Promise<void>;
    updateSolicitud: (solicitud: SolicitudTrabajo) => Promise<void>;
    deleteSolicitud: (id: number) => Promise<void>;
    fetchSolicitudes: () => Promise<void>;
    setSolicitudes: (solicitudes: SolicitudTrabajo[]) => void;
    setSelectedSolicitud: (solicitud: SolicitudTrabajo | null) => void;
}

type SolicitudTrabajoRow = {
    id: number;
    vecino_nombre: string;
    direccion_vecino: string;
    fecha_solicitud: string;
    estado_solicitud: string;
    titulo_solicitud: string;
    descripcion_solicitud?: string | null;
};

// Mapea los datos de Supabase al tipo `SolicitudTrabajo` local
const mapRowToSolicitud = (row: SolicitudTrabajoRow): SolicitudTrabajo => ({
    id: row.id,
    vecinoNombre: row.vecino_nombre,
    direccionVecino: row.direccion_vecino,
    fechaSolicitud: new Date(row.fecha_solicitud), // Conversión de string a Date
    estadoSolicitud: row.estado_solicitud,
    tituloSolicitud: row.titulo_solicitud,
    descripcionSolicitud: row.descripcion_solicitud ?? undefined,
});

export const useSolicitudTrabajoStore = create<SolicitudTrabajoState>((set) => ({
    solicitudes: [],
    selectedSolicitud: null,

    // Obtener solicitudes de trabajo de Supabase
    fetchSolicitudes: async () => {
        const { data, error } = await supabase.from('solicitudes_trabajo').select('*');
        if (error) {
            console.error('Error obteniendo solicitudes:', error.message);
            throw error;
        }
        const solicitudes = data.map(mapRowToSolicitud);
        set({ solicitudes });
    },

    // Agregar nueva solicitud de trabajo en Supabase y actualizar el estado
    addSolicitud: async (solicitud) => {
        const { error } = await supabase.from('solicitudes_trabajo').insert({
            vecino_nombre: solicitud.vecinoNombre,
            direccion_vecino: solicitud.direccionVecino,
            fecha_solicitud: solicitud.fechaSolicitud.toISOString(), // Conversión de Date a string ISO
            estado_solicitud: solicitud.estadoSolicitud,
            titulo_solicitud: solicitud.tituloSolicitud,
            descripcion_solicitud: solicitud.descripcionSolicitud,
        });
        if (error) {
            console.error('Error agregando solicitud de trabajo:', error.message);
            throw error;
        }
        await useSolicitudTrabajoStore.getState().fetchSolicitudes(); // Refresca las solicitudes después de la inserción
    },

    // Actualizar una solicitud de trabajo en Supabase y en el estado
    updateSolicitud: async (solicitud) => {
        const { error } = await supabase
            .from('solicitudes_trabajo')
            .update({
                vecino_nombre: solicitud.vecinoNombre,
                direccion_vecino: solicitud.direccionVecino,
                fecha_solicitud: solicitud.fechaSolicitud.toISOString(), // Conversión de Date a string ISO
                estado_solicitud: solicitud.estadoSolicitud,
                titulo_solicitud: solicitud.tituloSolicitud,
                descripcion_solicitud: solicitud.descripcionSolicitud,
            })
            .eq('id', solicitud.id);
        if (error) {
            console.error('Error actualizando solicitud de trabajo:', error.message);
            throw error;
        }
        set((state) => ({
            solicitudes: state.solicitudes.map((s) => (s.id === solicitud.id ? solicitud : s)),
        }));
    },

    // Eliminar una solicitud de trabajo en Supabase y en el estado
    deleteSolicitud: async (id) => {
        const { error } = await supabase.from('solicitudes_trabajo').delete().eq('id', id);
        if (error) {
            console.error('Error eliminando solicitud de trabajo:', error.message);
            throw error;
        }
        set((state) => ({
            solicitudes: state.solicitudes.filter((solicitud) => solicitud.id !== id),
        }));
    },

    setSolicitudes: (solicitudes) => set({ solicitudes }),
    setSelectedSolicitud: (solicitud) => set({ selectedSolicitud: solicitud }),
}));
