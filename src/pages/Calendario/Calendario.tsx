// import { Calendar } from 'react-big-calendar';
// import 'react-big-calendar/lib/css/react-big-calendar.css';
// import { DialogDemo } from './components/CalendarModal';
// import { localizer } from './helpers/calendarLocalizer';
// import { getMessagesES } from './helpers/getMessages';
// import { useUiStore } from '@/store/storeModalCalendario';
// import { ButtonCalendar } from './components/ButtonCalendar';
// import { useCalendarStore } from '@/store/storeCalendario';
// import { ButtonDeleteCalendar } from './components/ButtonDelete';
// import { useEffect } from 'react';
// import '../../styles.css'
// import { ButtonMant } from './componentsMant/ButtonMant';
// import { DialogMant } from './componentsMant/CalendarMant';
// import { useMantenimientoStore } from '@/store/storeCalendarioMant';
// import { useMantenimiento } from '@/store/storeModalMant';

// interface Event {
//     id: number;
//     title: string;
//     start: Date;
//     end: Date;
//     notes?: string;
//     horasExtras?: number;
//     zonas: string[];
//     fontaneroId: number;
// }

// export function Calendario() {
//     const { openDateModal, isDateModalOpen } = useUiStore();
//     const { openMaint, isMaintOpen } = useMantenimiento();
//     const { events, setSelectedEvent, selectedEvent, fetchEvents } = useCalendarStore();
//     const { mantenimientos, setSelectedMantenimiento, selectedMantenimiento, fetchMantenimientos } = useMantenimientoStore();

//     useEffect(() => {
//         fetchEvents(); // Carga los eventos desde Supabase al montar el componente
//     }, [fetchEvents]);

//     // Estilos para los eventos
//     const eventStyleGetter = (event: Event) => {
//         const isSelected = selectedEvent && selectedEvent.id === event.id;

//         const style = {
//             backgroundColor: '#7a1772',
//             borderRadius: '0px',
//             opacity: 0.8,
//             color: 'white',
//             boxShadow: isSelected ? '0 0 10px 2px rgba(0, 0, 0, 0.5)' : 'none',
//             border: isSelected ? '2px solid #FFD700' : 'none',
//         };
//         return { style };
//     };

//     const dayPropGetter = (date: Date) => {
//         const today = new Date();

//         if (
//             date.getDate() === today.getDate() &&
//             date.getMonth() === today.getMonth() &&
//             date.getFullYear() === today.getFullYear()
//         ) {
//             return {
//                 style: {
//                     backgroundColor: '#000',
//                     color: '#C0C0C0	',
//                 },
//             };
//         }
//         return {};
//     };

//     // Control + Click para abrir el modal con el evento seleccionado
//     const onSelect = (event: Event, e: React.SyntheticEvent) => {
//         const mouseEvent = e as unknown as React.MouseEvent; // Convertimos el SyntheticEvent a MouseEvent temporalmente

//         if (mouseEvent.ctrlKey) {
//             console.log("Control + Click event:", event); // Verificar si el evento es detectado con Control presionado
//             setSelectedEvent(event);
//             openDateModal(); // Abrir el modal si se hace Ctrl + Click
//         } else {
//             // Comportamiento normal de selección
//             if (selectedEvent && selectedEvent.id === event.id) {
//                 setSelectedEvent(null); // Deseleccionar si ya estaba seleccionado
//             } else {
//                 setSelectedEvent(event);
//             }
//         }
//     };

//     const CalendarEvent = ({ event }: { event: Event }) => {
//         const { title, notes } = event;
//         return (
//             <>
//                 <strong>{title}</strong>
//                 {notes && <span> - {notes}</span>}
//             </>
//         );
//     };

//     return (
//         <>
//             <Calendar
//                 culture="es"
//                 defaultView="month"
//                 localizer={localizer}
//                 events={events}
//                 startAccessor="start"
//                 endAccessor="end"
//                 style={{ height: 'calc(100vh - 97px)' }}
//                 messages={getMessagesES()}
//                 eventPropGetter={eventStyleGetter}
//                 dayPropGetter={dayPropGetter}
//                 components={{
//                     event: CalendarEvent,
//                 }}
//                 onSelectEvent={(event, e) => onSelect(event, e)}
//             />
//             {/* componente y boton para evento */}
//             <DialogDemo />
//             {/* <ButtonCalendar /> */}
//             {!selectedEvent && <ButtonCalendar />}
//             {/* {selectedEvent && !isDateModalOpen && <ButtonDeleteCalendar />} */}
//             {selectedEvent && !isDateModalOpen && <ButtonDeleteCalendar />}
//             {/* componente y botn para evento mantenimiento     */}
//             <DialogMant />
//             <ButtonMant />
//         </>
//     );
// }

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
    tipoMantenimiento: string[];
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
                style={{ height: 'calc(100vh - 97px)' }}
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
                {!selectedEvent && !selectedMantenimiento && <ButtonCalendar />}
                {(selectedEvent || selectedMantenimiento) && !isDateModalOpen && !isMaintOpen && <ButtonDeleteCalendar />}
                {/* componente y botón para mantenimiento */}
                <DialogMant />
                <ButtonMant />
            </>
        </>
    );
}
