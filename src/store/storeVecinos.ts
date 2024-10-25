
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import supabase from "@/supabase/supabase.config";
import { v4 as uuidv4 } from 'uuid';

// Tipos de datos actualizados con los nuevos campos
export type SolicitudTrabajo = {
    id: string;
    numero_expediente: number;
    nombre_solicitante: string;
    tarifa: string;
    fecha_ingreso: string; // Fecha en formato ISO (string)
    fontanero_id: string | null;
    bomba_distribucion_id: string | null;
};

export type DraftSolicitudTrabajo = Omit<SolicitudTrabajo, 'id'>;

// Tipo de Row de Supabase (Solicitud de trabajo)
type SolicitudRow = {
    id: number;
    numero_expediente: number;
    nombre_solicitante: string;
    tarifa: string;
    fecha_ingreso: string; // Supabase devuelve fechas como strings
    fontanero_id: number | null;
    bomba_distribucion_id: number | null;
};

// Estado para la solicitud de trabajo
type solicitudTrabajoState = {
    solicitudes: SolicitudTrabajo[];
    activeSolicitudId: SolicitudTrabajo['id'];
    addSolicitud: (data: DraftSolicitudTrabajo) => Promise<void>;
    deleteSolicitud: (id: SolicitudTrabajo['id']) => Promise<void>;
    getSolicitudById: (id: SolicitudTrabajo['id']) => void;
    updateSolicitud: (data: DraftSolicitudTrabajo) => Promise<void>;
    fetchSolicitudes: () => Promise<void>;
    setActiveSolicitudId: (id: string) => void;
};

// Mapeo de row de Supabase a nuestra estructura interna, agregando los nuevos campos
const mapRowToSolicitud = (row: SolicitudRow): SolicitudTrabajo => ({
    id: row.id.toString(),
    numero_expediente: row.numero_expediente,
    nombre_solicitante: row.nombre_solicitante,
    tarifa: row.tarifa,
    fecha_ingreso: row.fecha_ingreso,
    fontanero_id: row.fontanero_id?.toString() || null,
    bomba_distribucion_id: row.bomba_distribucion_id?.toString() || null,
});

export const useSolicitudTrabajoStore = create<solicitudTrabajoState>()(
    devtools(
        (set, get) => ({
            solicitudes: [],
            activeSolicitudId: '',

            // Fetch solicitudes de trabajo de Supabase
            fetchSolicitudes: async () => {
                const { data, error } = await supabase.from('solicitud_trabajo').select('*');
                if (error) {
                    console.error('Error obteniendo solicitudes de trabajo', error.message);
                    throw error;
                }

                const solicitudesMapped = (data as SolicitudRow[]).map(mapRowToSolicitud);
                set({ solicitudes: solicitudesMapped });
            },

            // Añadir nueva solicitud de trabajo con los campos nuevos
            addSolicitud: async (data: DraftSolicitudTrabajo) => {
                const newSolicitud = { ...data, id: uuidv4() };

                const { error } = await supabase.from('solicitud_trabajo').insert([{
                    numero_expediente: newSolicitud.numero_expediente,
                    nombre_solicitante: newSolicitud.nombre_solicitante,
                    tarifa: newSolicitud.tarifa,
                    fecha_ingreso: newSolicitud.fecha_ingreso,
                    fontanero_id: newSolicitud.fontanero_id ? parseInt(newSolicitud.fontanero_id) : null,
                    bomba_distribucion_id: newSolicitud.bomba_distribucion_id ? parseInt(newSolicitud.bomba_distribucion_id) : null
                }]);

                if (error) {
                    console.error('Error agregando solicitud de trabajo a Supabase', error.message);
                    throw error;
                }

                set((state) => ({
                    solicitudes: [...state.solicitudes, newSolicitud]
                }));
            },

            // Eliminar solicitud de trabajo
            deleteSolicitud: async (id: SolicitudTrabajo['id']) => {
                const { error } = await supabase.from('solicitud_trabajo').delete().eq('id', parseInt(id));
                if (error) {
                    console.error('Error eliminando solicitud de trabajo de Supabase', error.message);
                    throw error;
                }

                set((state) => ({
                    solicitudes: state.solicitudes.filter((solicitud) => solicitud.id !== id)
                }));
            },

            // Obtener solicitud por ID
            getSolicitudById: (id: SolicitudTrabajo['id']) => {
                set({ activeSolicitudId: id });
            },

            // Actualizar solicitud de trabajo, con los nuevos campos incluidos
            updateSolicitud: async (data: DraftSolicitudTrabajo) => {
                const { error } = await supabase
                    .from('solicitud_trabajo')
                    .update({
                        numero_expediente: data.numero_expediente,
                        nombre_solicitante: data.nombre_solicitante,
                        tarifa: data.tarifa,
                        fecha_ingreso: data.fecha_ingreso,
                        fontanero_id: data.fontanero_id ? parseInt(data.fontanero_id) : null,
                        bomba_distribucion_id: data.bomba_distribucion_id ? parseInt(data.bomba_distribucion_id) : null
                    })
                    .eq('id', parseInt(get().activeSolicitudId));

                if (error) {
                    console.error('Error actualizando solicitud de trabajo en Supabase', error.message);
                    throw error;
                }

                set((state) => ({
                    solicitudes: state.solicitudes.map((solicitud) =>
                        solicitud.id === get().activeSolicitudId ? { ...solicitud, ...data } : solicitud
                    )
                }));
            },
            // Añadir la función para limpiar o modificar el activeSolicitudId
            setActiveSolicitudId: (id: string) => set({ activeSolicitudId: id }), // Esta es la nueva función
        })
    )
);
