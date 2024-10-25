// import { create } from "zustand";
// import { devtools } from "zustand/middleware";
// import supabase from "@/supabase/supabase.config";
// import { v4 as uuidv4 } from 'uuid';
// type SolicitudTrabajo = {
//     id: string;
//     numero_expediente: number;
//     fecha_ingreso: Date;
//     nombre_solicitante: string;
//     direccion: string;
//     telefono: number;
//     nombre_sindico_acompanio: string;
//     fecha_inspeccion: Date;
//     numero_recibo: number;
//     monto: number;
//     fecha_recibo: Date;
//     numero_orden_instalacion: number;
//     fecha_instalacion: Date;
//     fontanero_id: string;
//     observacion: string;
//     numero_servicios: number;
//     bomba_distribucion_id: string;
//     tarifa: string;
//     drenaje: string;
//     numero_recibo_drenaje: number;
//     monto_drenaje: number;
//     levanto_adoquin: string;
//     numero_recibo_garantia: number;
//     deposito_garantia: string;
//     numero_medidor: string;
// };

// type DraftSolicitudTrabajo = Omit<SolicitudTrabajo, "id">;

// type Row = {
//     id: number;
//     numero_expediente: number;
//     fecha_ingreso: string;
//     nombre_solicitante: string;
//     direccion: string;
//     telefono: number;
//     nombre_sindico_acompanio: string;
//     fecha_inspeccion: string;
//     numero_recibo: number;
//     monto: number;
//     fecha_recibo: string;
//     numero_orden_instalacion: number;
//     fecha_instalacion: string;
//     fontanero_id: number | null;
//     observacion: string;
//     numero_servicios: number;
//     bomba_distribucion_id: number | null;
//     tarifa: string;
//     drenaje: string;
//     numero_recibo_drenaje: number;
//     monto_drenaje: number;
//     levanto_adoquin: string;
//     numero_recibo_garantia: number;
//     deposito_garantia: string;
//     numero_medidor: string;
// };

// type solicitudTrabajoState = {
//     solicitudes: SolicitudTrabajo[];
//     activeId: SolicitudTrabajo["id"];
//     addSolicitud: (data: DraftSolicitudTrabajo) => Promise<void>;
//     deleteSolicitud: (id: SolicitudTrabajo["id"]) => Promise<void>;
//     getSolicitudById: (id: SolicitudTrabajo["id"]) => void;
//     updateSolicitud: (data: DraftSolicitudTrabajo) => Promise<void>;
//     fetchSolicitudes: () => Promise<void>;
// };

// const mapRowToSolicitud = (row: Row): SolicitudTrabajo => ({
//     id: row.id.toString(),
//     numero_expediente: row.numero_expediente,
//     fecha_ingreso: new Date(row.fecha_ingreso),
//     nombre_solicitante: row.nombre_solicitante,
//     direccion: row.direccion,
//     telefono: row.telefono,
//     nombre_sindico_acompanio: row.nombre_sindico_acompanio,
//     fecha_inspeccion: new Date(row.fecha_inspeccion),
//     numero_recibo: row.numero_recibo,
//     monto: row.monto,
//     fecha_recibo: new Date(row.fecha_recibo),
//     numero_orden_instalacion: row.numero_orden_instalacion,
//     fecha_instalacion: new Date(row.fecha_instalacion),
//     fontanero_id: row.fontanero_id?.toString() || '',
//     observacion: row.observacion,
//     numero_servicios: row.numero_servicios,
//     bomba_distribucion_id: row.bomba_distribucion_id?.toString() || "",
//     tarifa: row.tarifa,
//     drenaje: row.drenaje,
//     numero_recibo_drenaje: row.numero_recibo_drenaje,
//     monto_drenaje: row.monto_drenaje,
//     levanto_adoquin: row.levanto_adoquin,
//     numero_recibo_garantia: row.numero_recibo_garantia,
//     deposito_garantia: row.deposito_garantia,
//     numero_medidor: row.numero_medidor,
// });

// export const useSolicitudTrabajoStore = create<solicitudTrabajoState>()(

//     devtools((set, get) => ({
//         solicitudes: [],
//         activeId: "",

//         // Fetch solicitudes from Supabase
//         fetchSolicitudes: async () => {
//             const { data, error } = await supabase.from("solicitudes_trabajo").select("*");
//             if (error) {
//                 console.error("Error obteniendo solicitudes", error.message);
//                 throw error;
//             }

//             const solicitudesMapped = (data as Row[]).map(mapRowToSolicitud);
//             set({ solicitudes: solicitudesMapped });
//         },

//         // Add new solicitud
//         addSolicitud: async (data: DraftSolicitudTrabajo) => {
//             const solicitudData = {
//                 ...data,
//                 fontanero_id: data.fontanero_id ? parseInt(data.fontanero_id, 10) : null,
//                 bomba_distribucion_id: data.bomba_distribucion_id ? parseInt(data.bomba_distribucion_id, 10) : null,
//                 fecha_ingreso: data.fecha_ingreso ? data.fecha_ingreso.toISOString() : "",  // Convertir a string o dejar vacío
//                 fecha_inspeccion: data.fecha_inspeccion ? data.fecha_inspeccion.toISOString() : "",
//                 fecha_recibo: data.fecha_recibo ? data.fecha_recibo.toISOString() : "",
//                 fecha_instalacion: data.fecha_instalacion ? data.fecha_instalacion.toISOString() : ""
//             };

//             const { error } = await supabase.from("solicitudes_trabajo").insert([solicitudData]);

//             if (error) {
//                 console.error("Error agregando solicitud a Supabase", error.message);
//                 throw error;
//             }

//             set((state) => ({
//                 solicitudes: [...state.solicitudes, { ...data, id: uuidv4() }]
//             }));
//         },

//         // Delete solicitud
//         deleteSolicitud: async (id: SolicitudTrabajo["id"]) => {
//             const { error } = await supabase.from("solicitudes_trabajo").delete().eq("id", parseInt(id));
//             if (error) {
//                 console.error("Error eliminando solicitud de Supabase", error.message);
//                 throw error;
//             }

//             set((state) => ({
//                 solicitudes: state.solicitudes.filter((solicitud) => solicitud.id !== id)
//             }));
//         },

//         // Get solicitud by ID
//         getSolicitudById: (id: SolicitudTrabajo["id"]) => {
//             set({ activeId: id });
//         },

//         // Update solicitud
//         updateSolicitud: async (data: DraftSolicitudTrabajo) => {
//             const solicitudToUpdate = {
//                 ...data,
//                 bomba_distribucion_id: data.bomba_distribucion_id ? parseInt(data.bomba_distribucion_id) : null,
//                 fontanero_id: data.fontanero_id ? parseInt(data.fontanero_id) : null,
//                 fecha_ingreso: data.fecha_ingreso ? data.fecha_ingreso.toISOString() : "",  // Asegúrate de que sea string
//                 fecha_inspeccion: data.fecha_inspeccion ? data.fecha_inspeccion.toISOString() : "",
//                 fecha_recibo: data.fecha_recibo ? data.fecha_recibo.toISOString() : "",
//                 fecha_instalacion: data.fecha_instalacion ? data.fecha_instalacion.toISOString() : ""
//             };

//             const { error } = await supabase
//                 .from("solicitudes_trabajo")
//                 .update(solicitudToUpdate)
//                 .eq("id", parseInt(get().activeId)); // Convierte activeId si es necesario

//             if (error) {
//                 console.error("Error actualizando solicitud en Supabase", error.message);
//                 throw error;
//             }

//             set((state) => ({
//                 solicitudes: state.solicitudes.map((solicitud) =>
//                     solicitud.id === get().activeId ? { ...solicitud, ...data } : solicitud
//                 )
//             }));
//         },
//     }))
// );

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
    fetchSolicitudes: () => Promise<void>;
    addSolicitud: (data: DraftSolicitudTrabajo) => Promise<void>;
    deleteSolicitud: (id: SolicitudTrabajo['id']) => Promise<void>;
    updateSolicitud: (data: DraftSolicitudTrabajo) => Promise<void>;
    getSolicitudById: (id: SolicitudTrabajo['id']) => void;
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
        })
    )
);
