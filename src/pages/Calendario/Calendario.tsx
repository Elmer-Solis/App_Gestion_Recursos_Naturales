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
import '../../styles.css';
import { ButtonMant } from './componentsMant/ButtonMant';
import { DialogMant } from './componentsMant/CalendarMant';
import { useMantenimientoStore } from '@/store/storeCalendarioMant';
import { useMantenimiento } from '@/store/storeModalMant';

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

interface Mantenimiento {
    id: number;
    bombaId: number;
    fechaInicioMantenimiento: Date;
    fechaFinMantenimiento: Date;
    tipoMantenimiento: string;
    titulo_mantenimiento: string;
    notasMantenimiento?: string;
    costo?: number;
}

export function Calendario() {
    const { openDateModal, isDateModalOpen } = useUiStore();
    const { events, setSelectedEvent, selectedEvent, fetchEvents } = useCalendarStore();
    const { mantenimientos, setSelectedMantenimiento, selectedMantenimiento, fetchMantenimientos } = useMantenimientoStore();
    const { openMaint, isMaintOpen } = useMantenimiento(); // Nuevo hook para el modal de mantenimiento

    useEffect(() => {
        fetchEvents(); // Carga los eventos de calendario desde Supabase
        fetchMantenimientos(); // Carga los mantenimientos desde Supabase
    }, [fetchEvents, fetchMantenimientos]);

    // Unificación de eventos y mantenimientos
    const allEvents = [
        ...events,
        ...mantenimientos.map((mantenimiento) => ({
            ...mantenimiento,
            id: mantenimiento.id,
            title: mantenimiento.titulo_mantenimiento,
            start: mantenimiento.fechaInicioMantenimiento,
            end: mantenimiento.fechaFinMantenimiento,
            mantenimiento: true, // Marcar que es un evento de mantenimiento
        })),
    ];

    // Estilos para los eventos
    const eventStyleGetter = (event: Event | Mantenimiento) => {
        const isSelected = selectedEvent?.id === event.id || selectedMantenimiento?.id === event.id;
        const isMantenimiento = (event as Mantenimiento).titulo_mantenimiento !== undefined;

        const style = {
            backgroundColor: isMantenimiento ? '#177272' : '#7a1772',
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
                    backgroundColor: '#000',
                    color: '#C0C0C0',
                },
            };
        }
        return {};
    };

    // Selección de eventos (Ctrl + Click)
    const onSelect = (event: Event | Mantenimiento, e: React.SyntheticEvent) => {
        const mouseEvent = e as unknown as React.MouseEvent;

        if (mouseEvent.ctrlKey) {
            console.log('Control + Click event:', event);
            if ('titulo_mantenimiento' in event) {
                setSelectedMantenimiento(event as Mantenimiento);
                openMaint(); // Abrir el modal de mantenimiento si es un evento de mantenimiento
            } else {
                setSelectedEvent(event as Event);
                openDateModal(); // Abrir el modal de evento normal
            }
        } else {
            if ('titulo_mantenimiento' in event) {
                if (selectedMantenimiento?.id === event.id) {
                    setSelectedMantenimiento(null);
                } else {
                    setSelectedMantenimiento(event as Mantenimiento);
                }
            } else {
                if (selectedEvent?.id === event.id) {
                    setSelectedEvent(null);
                } else {
                    setSelectedEvent(event as Event);
                }
            }
        }
    };

    const CalendarEvent = ({ event }: { event: Event | Mantenimiento }) => {
        const { title, notes, titulo_mantenimiento, notasMantenimiento } = event as Event & Mantenimiento;
        return (
            <>
                <strong>{title || titulo_mantenimiento}</strong>
                {(notes || notasMantenimiento) && <span> - {notes || notasMantenimiento}</span>}
            </>
        );
    };

    return (
        <>
            <Calendar
                culture="es"
                defaultView="month"
                localizer={localizer}
                events={allEvents}
                startAccessor="start"
                endAccessor="end"
                style={{ height: "calc(100vh - 115px)" }}
                messages={getMessagesES()}
                eventPropGetter={eventStyleGetter}
                dayPropGetter={dayPropGetter}
                components={{
                    event: CalendarEvent,
                }}
                onSelectEvent={(event, e) => onSelect(event, e)}
            />
            {/* componente y botón para evento */}
            <>
                <DialogDemo />
                <DialogMant />

                {!selectedEvent && !selectedMantenimiento && <ButtonCalendar />}
                {!selectedEvent && !selectedMantenimiento && <ButtonMant />}
                {(selectedEvent || selectedMantenimiento) && !isDateModalOpen && !isMaintOpen && <ButtonDeleteCalendar />}
                {/* componente y botón para mantenimiento */}
            </>
        </>
    );
}
