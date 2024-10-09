// import { create } from 'zustand';

// interface Event {
//     id: string; // Cambiado a string
//     title: string;
//     start: Date;
//     end: Date;
//     notes?: string;
// }

// interface CalendarState {
//     events: Event[];
//     selectedEvent: Event | null;
//     addEvent: (event: Event) => void;
//     updateEvent: (event: Event) => void;
//     deleteEvent: (id: string) => void;
//     setEvents: (events: Event[]) => void;
//     setSelectedEvent: (event: Event | null) => void; // Agregar este método
// }

// export const useCalendarStore = create<CalendarState>((set) => ({
//     events: [],
//     selectedEvent: null,
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

interface Event {
    id: string; // Mantener el tipo string
    title: string;
    start: Date;
    end: Date;
    notes?: string;
    // fontaneros: string[]; // Agregando fontaneros al evento
    horasExtras?: number;  // Agregando horas extras al evento
    zonas: string[];
}

interface CalendarState {
    events: Event[];
    selectedEvent: Event | null;
    addEvent: (event: Event) => void;
    updateEvent: (event: Event) => void;
    deleteEvent: (id: string) => void;
    setEvents: (events: Event[]) => void;
    setSelectedEvent: (event: Event | null) => void;
}

export const useCalendarStore = create<CalendarState>((set) => ({
    events: [],
    selectedEvent: null,

    // Métodos para eventos
    addEvent: (event) => set((state) => ({ events: [...state.events, event] })),
    updateEvent: (updatedEvent) => set((state) => ({
        events: state.events.map((event) => (event.id === updatedEvent.id ? updatedEvent : event)),
    })),
    deleteEvent: (id) => set((state) => ({
        events: state.events.filter((event) => event.id !== id),
    })),
    setEvents: (events) => set({ events }),
    setSelectedEvent: (event) => set({ selectedEvent: event }),
}));
