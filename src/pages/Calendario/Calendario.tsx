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

export function Calendario() {
    const { openDateModal, isDateModalOpen } = useUiStore();
    const { events, setSelectedEvent, selectedEvent } = useCalendarStore(); // Obtenemos el evento seleccionado

    useEffect(() => {
        console.log(events);
    }, [events])



    // Estilos para los eventos
    const eventStyleGetter = (event: Event) => {
        const isSelected = selectedEvent && selectedEvent.id === event.id; // Comparamos el evento actual con el seleccionado

        const style = {
            backgroundColor: '#7a1772',
            borderRadius: '0px',
            opacity: 0.8,
            color: 'white',
            boxShadow: isSelected ? '0 0 10px 2px rgba(0, 0, 0, 0.5)' : 'none', // Añadimos sombra si está seleccionado
            border: isSelected ? '2px solid #FFD700' : 'none', // Añadimos borde si está seleccionado
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

    const onDoubleClick = (event: Event) => {
        setSelectedEvent(event);
        openDateModal();
    };

    const onSelect = (event: Event) => {
        if (selectedEvent && selectedEvent.id === event.id) {
            // Si el evento clicado es el mismo que el seleccionado, lo deseleccionamos
            setSelectedEvent(null);
        } else {
            // Si no, seleccionamos el nuevo evento
            setSelectedEvent(event);
        }
    };

    const CalendarEvent = ({ event }: { event: Event }) => {
        const { title, notes } = event;

        return (
            <>
                <strong>{title}</strong>
                {notes && <span> - {notes}</span>}
                {/* <strong>{title}</strong> */}
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
                onDoubleClickEvent={onDoubleClick}
                onSelectEvent={onSelect}
            />
            <DialogDemo />
            {/* <ButtonCalendar /> */}
            {!selectedEvent && !isDateModalOpen && <ButtonCalendar />}
            {selectedEvent && !isDateModalOpen && <ButtonDeleteCalendar />}
        </>
    );
}

