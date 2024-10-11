
// import { create } from 'zustand';

// interface Event {
//     id: string; // Mantener el tipo string
//     title: string;
//     start: Date;
//     end: Date;
//     notes?: string;
//     // fontaneros: string[]; // Agregando fontaneros al evento
//     horasExtras?: number;  // Agregando horas extras al evento
//     zonas: string[];
// }

// interface CalendarState {
//     events: Event[];
//     selectedEvent: Event | null;
//     addEvent: (event: Event) => void;
//     updateEvent: (event: Event) => void;
//     deleteEvent: (id: string) => void;
//     setEvents: (events: Event[]) => void;
//     setSelectedEvent: (event: Event | null) => void;
// }

// export const useCalendarStore = create<CalendarState>((set) => ({
//     events: [],
//     selectedEvent: null,

//     // Métodos para eventos
//     addEvent: (event) => set((state) => ({ events: [...state.events, event] })),
//     updateEvent: (updatedEvent) => set((state) => ({
//         events: state.events.map((event) => (event.id === updatedEvent.id ? updatedEvent : event)),
//     })),
//     deleteEvent: (id) => set((state) => ({
//         events: state.events.filter((event) => event.id !== id),
//     })),
//     setEvents: (events) => set({ events }),
//     setSelectedEvent: (event) => set({ selectedEvent: event }),
// }));


import { create } from 'zustand';
import supabase from "@/supabase/supabase.config";

interface Event {
    id: number;
    title: string;
    start: Date;
    end: Date;
    notes?: string;
    horasExtras?: number;
    zonas: string[];
    fontaneroId: number;
}

interface CalendarState {
    events: Event[];
    selectedEvent: Event | null;
    addEvent: (event: Omit<Event, 'id'>) => Promise<void>;
    updateEvent: (event: Event) => Promise<void>;
    deleteEvent: (id: number) => Promise<void>;
    fetchEvents: () => Promise<void>;
    setEvents: (events: Event[]) => void;
    setSelectedEvent: (event: Event | null) => void;
}

type EventRow = {
    id: number;
    titulo_actividad: string;
    fecha_inicio: string;
    fecha_fin: string;
    notas_actividad?: string | null;
    horas_extras?: number | null;
    zona_distribucion: string;
    fontanero_id: number;
};

// Mapea los datos de Supabase al tipo `Event` local
const mapRowToEvent = (row: EventRow): Event => ({
    id: row.id,
    title: row.titulo_actividad,
    start: new Date(row.fecha_inicio),
    end: new Date(row.fecha_fin),
    notes: row.notas_actividad ?? undefined,
    horasExtras: row.horas_extras ?? undefined,
    zonas: row.zona_distribucion.split(','), // Convierte la cadena en un array
    fontaneroId: row.fontanero_id
});
export const useCalendarStore = create<CalendarState>((set) => ({
    events: [],
    selectedEvent: null,

    // Obtener eventos de Supabase
    fetchEvents: async () => {
        const { data, error } = await supabase.from('eventos_actividades').select('*');
        if (error) {
            console.error('Error obteniendo eventos:', error.message);
            throw error;
        }
        const events = data.map(mapRowToEvent);
        set({ events });
    },

    // Agregar nuevo evento en Supabase y actualizar el estado
    addEvent: async (event) => {
        const { error } = await supabase.from('eventos_actividades').insert({
            titulo_actividad: event.title,
            fecha_inicio: event.start.toISOString(),
            fecha_fin: event.end.toISOString(),
            notas_actividad: event.notes,
            horas_extras: event.horasExtras,
            zona_distribucion: event.zonas.join(','), // Convierte el array en una cadena separada por comas
            fontanero_id: event.fontaneroId
        });
        if (error) {
            console.error('Error agregando evento:', error.message);
            throw error;
        }
        await useCalendarStore.getState().fetchEvents(); // Refresca los eventos después de la inserción
    },

    // Actualizar un evento en Supabase y en el estado
    updateEvent: async (event) => {
        const { error } = await supabase.from('eventos_actividades')
            .update({
                titulo_actividad: event.title,
                fecha_inicio: event.start.toISOString(),
                fecha_fin: event.end.toISOString(),
                notas_actividad: event.notes,
                horas_extras: event.horasExtras,
                zona_distribucion: event.zonas.join(','),
                fontanero_id: event.fontaneroId
            })
            .eq('id', event.id);
        if (error) {
            console.error('Error actualizando evento:', error.message);
            throw error;
        }
        set((state) => ({
            events: state.events.map((e) => (e.id === event.id ? event : e)),
        }));
    },

    // Eliminar un evento en Supabase y en el estado
    deleteEvent: async (id) => {
        const { error } = await supabase.from('eventos_actividades').delete().eq('id', id);
        if (error) {
            console.error('Error eliminando evento:', error.message);
            throw error;
        }
        set((state) => ({
            events: state.events.filter((event) => event.id !== id),
        }));
    },

    setEvents: (events) => set({ events }),
    setSelectedEvent: (event) => set({ selectedEvent: event }),
}));
