// import { Calendar } from 'react-big-calendar';
// import 'react-big-calendar/lib/css/react-big-calendar.css';
// import { DialogDemo } from './components/CalendarModal';
// import { localizer } from './helpers/calendarLocalizer';
// import { getMessagesES } from './helpers/getMessages';
// import { useUiStore } from '@/store/storeModalCalendario';
// import { ButtonCalendar } from './components/ButtonCalendar';
// import { useCalendarStore } from '@/store/storeCalendario';

// interface Event {
//     id: string; // Cambiado a string
//     title: string;
//     start: Date;
//     end: Date;
//     notes?: string;
// }

// export function Calendario() {
//     const { openDateModal } = useUiStore();
//     const { events, setSelectedEvent } = useCalendarStore();

//     const eventStyleGetter = () => {
//         const style = {
//             backgroundColor: '#7a1772',
//             borderRadius: '0px',
//             opacity: 0.8,
//             color: 'white',
//         };
//         return { style };
//     };

//     const onDoubleClick = (event:Event) => {
//         setSelectedEvent(event);
//         openDateModal();
//     };

//     const onSelect = (event:Event) => {
//         console.log({ onSelect: event });
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
//                 events={events} // Aquí se usan los eventos del store
//                 startAccessor="start"
//                 endAccessor="end"
//                 style={{ height: 'calc(100vh - 97px)' }}
//                 messages={getMessagesES()}
//                 eventPropGetter={eventStyleGetter}
//                 components={{
//                     event: CalendarEvent,
//                 }}
//                 onDoubleClickEvent={onDoubleClick}
//                 onSelectEvent={onSelect}
//             />
//             <DialogDemo />
//             <ButtonCalendar />
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

interface Event {
    id: string; // Cambiado a string
    title: string;
    start: Date;
    end: Date;
    notes?: string;
}

export function Calendario() {
    const { openDateModal } = useUiStore();
    const { events, setSelectedEvent } = useCalendarStore();

    // Estilos para los eventos
    const eventStyleGetter = () => {
        const style = {
            backgroundColor: '#7a1772',
            borderRadius: '0px',
            opacity: 0.8,
            color: 'white',
        };
        return { style };
    };

    // Función para aplicar estilo al día actual
    const dayPropGetter = (date: Date) => {
        const today = new Date();

        if (
            date.getDate() === today.getDate() &&
            date.getMonth() === today.getMonth() &&
            date.getFullYear() === today.getFullYear()
        ) {
            return {
                style: {
                    backgroundColor: '#041a5d', // Cambia el color del día actual
                    color: '#000', // Color del texto
                },
            };
        }
        return {}; // Sin cambios para otros días
    };

    const onDoubleClick = (event: Event) => {
        setSelectedEvent(event);
        openDateModal();
    };

    const onSelect = (event: Event) => {
        console.log({ onSelect: event });
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
                events={events} // Aquí se usan los eventos del store
                startAccessor="start"
                endAccessor="end"
                style={{ height: 'calc(100vh - 97px)' }}
                messages={getMessagesES()}
                eventPropGetter={eventStyleGetter}
                dayPropGetter={dayPropGetter} // Aquí agregamos el estilo para los días
                components={{
                    event: CalendarEvent,
                }}
                onDoubleClickEvent={onDoubleClick}
                onSelectEvent={onSelect}
            />
            <DialogDemo />
            <ButtonCalendar />
        </>
    );
}
