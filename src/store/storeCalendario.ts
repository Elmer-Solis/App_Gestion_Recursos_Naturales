import { create } from 'zustand';

interface Event {
    id: string; // Cambiado a string
    title: string;
    start: Date;
    end: Date;
    notes?: string;
}

interface CalendarState {
    events: Event[];
    addEvent: (event: Event) => void;
    updateEvent: (event: Event) => void;
    deleteEvent: (id: string) => void; // Cambiado a string
    setEvents: (events: Event[]) => void;
}

export const useCalendarStore = create<CalendarState>((set) => ({
    events: [{
        id: "1",
        title: "Reunión de Proyecto",
        start: new Date('2024-10-10T10:00:00'),
        end: new Date('2024-10-10T11:00:00'),
        notes: "Reunión para discutir el avance del proyecto."
    }], // Estado inicial con un evento de ejemplo
    addEvent: (event: Event) => set((state) => ({
        events: [...state.events, event],
    })),
    updateEvent: (updatedEvent: Event) => set((state) => ({
        events: state.events.map((event) =>
            event.id === updatedEvent.id ? updatedEvent : event
        ),
    })),
    deleteEvent: (id: string) => set((state) => ({
        events: state.events.filter((event) => event.id !== id),
    })),
    setEvents: (events: Event[]) => set({ events }),
}));
