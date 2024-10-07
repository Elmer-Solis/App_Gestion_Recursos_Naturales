import { create } from 'zustand';
import { addMinutes } from 'date-fns';
import { v4 as uuidv4 } from 'uuid';

interface User {
    _id: string;
    name: string;
}

interface Event {
    _id: string; // Cambiado a string para usar uuid
    title: string;
    notes: string;
    start: Date;
    end: Date;
    bgColor: string;
    user: User;
}

interface CalendarState {
    events: Event[];
    activeEvent: Event | null;
    onSetActiveEvent: (event: Event) => void;
    onAddNewEvent: (event: Event) => void;
    onUpdateEvent: (event: Event) => void;
    onDeleteEvent: () => void;
}

// Evento temporal inicial usando uuid
const tempEvent: Event = {
    _id: uuidv4(), // Generar ID único
    title: 'Cumpleaños del Jefe',
    notes: 'Hay que comprar el pastel',
    start: new Date(),
    end: addMinutes(new Date(), 2),
    bgColor: '#fafafa',
    user: {
        _id: '123',
        name: 'Fernandito',
    },
};

// Crear la tienda de Zustand
export const useCalendarStore = create<CalendarState>((set) => ({
    events: [tempEvent],
    activeEvent: null,
    onSetActiveEvent: (event) => set({ activeEvent: event }),
    onAddNewEvent: (event) => set((state) => ({
        events: [...state.events, { ...event, _id: uuidv4() }], // Asignar un nuevo uuid al evento
        activeEvent: null,
    })),
    onUpdateEvent: (event) => set((state) => ({
        events: state.events.map((e) => (e._id === event._id ? event : e)),
    })),
    onDeleteEvent: () => set((state) => {
        if (state.activeEvent) {
            return {
                events: state.events.filter((event) => event._id !== state.activeEvent?._id),
                activeEvent: null,
            };
        }
        return state;
    }),
}));
