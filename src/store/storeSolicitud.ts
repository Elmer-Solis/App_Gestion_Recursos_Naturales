import { create } from "zustand";
import { devtools } from "zustand/middleware";
import supabase from "@/supabase/supabase.config";
import { v4 as uuidv4 } from 'uuid';

// Tipo principal de SolicitudTrabajo basado en la tabla SQL
export type SolicitudTrabajo = {
    id: string; // SERIAL en SQL
    numero_expediente: string;
    fecha_ingreso: string; // Fecha en formato ISO (string)
    nombre_solicitante: string;
    direccion: string;
    telefono: number;
    nombre_sindico_acompanio: string;
    fecha_inspeccion: string; // Fecha en formato ISO (string)
    numero_recibo: number;
    monto: number;
    fecha_recibo: string; // Fecha en formato ISO (string)
    numero_orden_instalacion: number;
    fecha_instalacion: string; // Fecha en formato ISO (string)
    fontanero_id: string | null;
    observacion: string;
    numero_servicios: number;
    bomba_distribucion_id: string | null;
    tarifa: string;
    drenaje: string;
    numero_recibo_drenaje: number;
    monto_drenaje: number;
    levanto_adoquin: string;
    numero_recibo_garantia: number;
    deposito_garantia: string;
    numero_medidor: string;
};

// Tipo de borrador de SolicitudTrabajo, excluyendo el campo 'id'
export type DraftSolicitudTrabajo = Omit<SolicitudTrabajo, 'id'>;

// Tipo de Row de Supabase (Solicitud de trabajo)
type SolicitudRow = {
    id: number; // SERIAL en SQL
    numero_expediente: string;
    fecha_ingreso: string; // Supabase devuelve fechas como strings
    nombre_solicitante: string;
    direccion: string;
    telefono: number;
    nombre_sindico_acompanio: string;
    fecha_inspeccion: string;
    numero_recibo: number;
    monto: number;
    fecha_recibo: string;
    numero_orden_instalacion: number;
    fecha_instalacion: string;
    fontanero_id: number | null;
    observacion: string;
    numero_servicios: number;
    bomba_distribucion_id: number | null;
    tarifa: string;
    drenaje: string;
    numero_recibo_drenaje: number;
    monto_drenaje: number;
    levanto_adoquin: string;
    numero_recibo_garantia: number;
    deposito_garantia: string;
    numero_medidor: string;
};

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

const mapRowToSolicitud = (row: SolicitudRow): SolicitudTrabajo => ({
    id: row.id.toString(),
    numero_expediente: row.numero_expediente,
    fecha_ingreso: row.fecha_ingreso,
    nombre_solicitante: row.nombre_solicitante,
    direccion: row.direccion,
    telefono: row.telefono,
    nombre_sindico_acompanio: row.nombre_sindico_acompanio,
    fecha_inspeccion: row.fecha_inspeccion,
    numero_recibo: row.numero_recibo,
    monto: row.monto,
    fecha_recibo: row.fecha_recibo,
    numero_orden_instalacion: row.numero_orden_instalacion,
    fecha_instalacion: row.fecha_instalacion,
    fontanero_id: row.fontanero_id?.toString() || null,
    observacion: row.observacion,
    numero_servicios: row.numero_servicios,
    bomba_distribucion_id: row.bomba_distribucion_id?.toString() || null,
    tarifa: row.tarifa,
    drenaje: row.drenaje,
    numero_recibo_drenaje: row.numero_recibo_drenaje,
    monto_drenaje: row.monto_drenaje,
    levanto_adoquin: row.levanto_adoquin,
    numero_recibo_garantia: row.numero_recibo_garantia,
    deposito_garantia: row.deposito_garantia,
    numero_medidor: row.numero_medidor,
});

export const useSolicitudVecinoStore = create<solicitudTrabajoState>()(
    devtools(
        (set, get) => ({
            solicitudes: [],
            activeSolicitudId: '',

            // Fetch solicitudes de trabajo de Supabase
            fetchSolicitudes: async () => {
                const { data, error } = await supabase.from('solicitudes_trabajo').select('*');
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

                const { error } = await supabase.from('solicitudes_trabajo').insert([{
                    numero_expediente: newSolicitud.numero_expediente,
                    fecha_ingreso: newSolicitud.fecha_ingreso,
                    nombre_solicitante: newSolicitud.nombre_solicitante,
                    direccion: newSolicitud.direccion,
                    telefono: newSolicitud.telefono,
                    nombre_sindico_acompanio: newSolicitud.nombre_sindico_acompanio,
                    fecha_inspeccion: newSolicitud.fecha_inspeccion,
                    numero_recibo: newSolicitud.numero_recibo,
                    monto: newSolicitud.monto,
                    fecha_recibo: newSolicitud.fecha_recibo,
                    numero_orden_instalacion: newSolicitud.numero_orden_instalacion,
                    fecha_instalacion: newSolicitud.fecha_instalacion,
                    fontanero_id: newSolicitud.fontanero_id ? parseInt(newSolicitud.fontanero_id) : null,
                    observacion: newSolicitud.observacion,
                    numero_servicios: newSolicitud.numero_servicios,
                    bomba_distribucion_id: newSolicitud.bomba_distribucion_id ? parseInt(newSolicitud.bomba_distribucion_id) : null,
                    tarifa: newSolicitud.tarifa,
                    drenaje: newSolicitud.drenaje,
                    numero_recibo_drenaje: newSolicitud.numero_recibo_drenaje,
                    monto_drenaje: newSolicitud.monto_drenaje,
                    levanto_adoquin: newSolicitud.levanto_adoquin,
                    numero_recibo_garantia: newSolicitud.numero_recibo_garantia,
                    deposito_garantia: newSolicitud.deposito_garantia,
                    numero_medidor: newSolicitud.numero_medidor
                }]);

                if (error) {
                    console.error('Error agregando solicitud de trabajo a Supabase', error.message);
                    throw error;
                }

                set((state) => ({
                    solicitudes: [...state.solicitudes, newSolicitud]
                }));
            }, deleteSolicitud: async (id: SolicitudTrabajo['id']) => {
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
            },    // Actualizar solicitud de trabajo, con los nuevos campos incluidos
            updateSolicitud: async (data: DraftSolicitudTrabajo) => {
                const { error } = await supabase
                    .from('solicitudes_trabajo')
                    .update({
                        numero_expediente: data.numero_expediente,
                        fecha_ingreso: data.fecha_ingreso,
                        nombre_solicitante: data.nombre_solicitante,
                        direccion: data.direccion,
                        telefono: data.telefono,
                        nombre_sindico_acompanio: data.nombre_sindico_acompanio,
                        fecha_inspeccion: data.fecha_inspeccion,
                        numero_recibo: data.numero_recibo,
                        monto: data.monto,
                        fecha_recibo: data.fecha_recibo,
                        numero_orden_instalacion: data.numero_orden_instalacion,
                        fecha_instalacion: data.fecha_instalacion,
                        fontanero_id: data.fontanero_id ? parseInt(data.fontanero_id) : null,
                        observacion: data.observacion,
                        numero_servicios: data.numero_servicios,
                        bomba_distribucion_id: data.bomba_distribucion_id ? parseInt(data.bomba_distribucion_id) : null,
                        tarifa: data.tarifa,
                        drenaje: data.drenaje,
                        numero_recibo_drenaje: data.numero_recibo_drenaje,
                        monto_drenaje: data.monto_drenaje,
                        levanto_adoquin: data.levanto_adoquin,
                        numero_recibo_garantia: data.numero_recibo_garantia,
                        deposito_garantia: data.deposito_garantia,
                        numero_medidor: data.numero_medidor
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
