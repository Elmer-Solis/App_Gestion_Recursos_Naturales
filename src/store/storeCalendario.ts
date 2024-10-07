import { create } from 'zustand';
import { addHours, addMinutes } from 'date-fns';

interface User {
    _id: string;
    name: string;
}

interface Event {
    _id: number;
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

// Evento temporal inicial
const tempEvent: Event = {
    _id: new Date().getTime(),
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
        events: [...state.events, event],
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
