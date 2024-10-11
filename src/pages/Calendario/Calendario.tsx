import { Calendar } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { DialogDemo } from './components/CalendarModal';
import { localizer } from './helpers/calendarLocalizer';
import { getMessagesES } from './helpers/getMessages';
import { useUiStore } from '@/store/storeModalCalendario';
import { ButtonCalendar } from './components/ButtonCalendar';
import { useCalendarStore } from '@/store/storeCalendario';
import { ButtonDeleteCalendar } from './components/ButtonDelete';
import { useEffect } from 'react';
import '../../styles.css'

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

export function Calendario() {
    const { openDateModal, isDateModalOpen } = useUiStore();
    const { events, setSelectedEvent, selectedEvent, fetchEvents } = useCalendarStore();

    useEffect(() => {
        fetchEvents(); // Carga los eventos desde Supabase al montar el componente
    }, [fetchEvents]);

    // Estilos para los eventos
    const eventStyleGetter = (event: Event) => {
        const isSelected = selectedEvent && selectedEvent.id === event.id;

        const style = {
            backgroundColor: '#7a1772',
            borderRadius: '0px',
            opacity: 0.8,
            color: 'white',
            boxShadow: isSelected ? '0 0 10px 2px rgba(0, 0, 0, 0.5)' : 'none',
            border: isSelected ? '2px solid #FFD700' : 'none',
        };

        return { style };
    };

    const dayPropGetter = (date: Date) => {
        const today = new Date();

        if (
            date.getDate() === today.getDate() &&
            date.getMonth() === today.getMonth() &&
            date.getFullYear() === today.getFullYear()
        ) {
            return {
                style: {
                    backgroundColor: '#041a5d',
                    color: '#d61212',
                },
            };
        }
        return {};
    };

    // Control + Click para abrir el modal con el evento seleccionado
    const onSelect = (event: Event, e: React.SyntheticEvent) => {
        const mouseEvent = e as unknown as React.MouseEvent; // Convertimos el SyntheticEvent a MouseEvent temporalmente

        if (mouseEvent.ctrlKey) {
            console.log("Control + Click event:", event); // Verificar si el evento es detectado con Control presionado
            setSelectedEvent(event);
            openDateModal(); // Abrir el modal si se hace Ctrl + Click
        } else {
            // Comportamiento normal de selección
            if (selectedEvent && selectedEvent.id === event.id) {
                setSelectedEvent(null); // Deseleccionar si ya estaba seleccionado
            } else {
                setSelectedEvent(event);
            }
        }
    };

    const CalendarEvent = ({ event }: { event: Event }) => {
        const { title, notes } = event;

        return (
            <>
                <strong>{title}</strong>
                {notes && <span> - {notes}</span>}
            </>
        );
    };

    return (
        <>
            <Calendar
                culture="es"
                defaultView="month"
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 'calc(100vh - 97px)' }}
                messages={getMessagesES()}
                eventPropGetter={eventStyleGetter}
                dayPropGetter={dayPropGetter}
                components={{
                    event: CalendarEvent,
                }}
                onSelectEvent={(event, e) => onSelect(event, e)}
            />
            <DialogDemo />
            {/* <ButtonCalendar /> */}
            {!selectedEvent && <ButtonCalendar />}
            {/* {selectedEvent && !isDateModalOpen && <ButtonDeleteCalendar />} */}
            {selectedEvent && !isDateModalOpen && <ButtonDeleteCalendar />}
        </>
    );
}
