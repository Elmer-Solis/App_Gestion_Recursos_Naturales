import { Calendar } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { DialogDemo } from './components/CalendarModal';
import { localizer } from './helpers/calendarLocalizer';
import { getMessagesES } from './helpers/getMessages';
import { CalendarEvent } from './components/CalendarEvent';
import { useUiStore } from '@/store/storeModalCalendario';
import { useCalendarStore } from '@/store/storeCalendario';
import { ButtonCalendar } from './components/ButtonCalendar';




export function Calendario() {
    // Obtén la función openDateModal desde el store
    const { openDateModal } = useUiStore();


    // Obtén los eventos desde el store de Zustand
    const { events, onSetActiveEvent } = useCalendarStore(); // Accede a los eventos desde Zustand

    const eventStyleGetter = (event, start, end, isSelected) => {

        const style = {
            backgroundColor: '#347CF7',
            borderRadius: '0px',
            opacity: 0.8,
            color: 'white',
        };

        return { style };
    };

    // Modifica la función onDoubleClick
    const onDoubleClick = (event) => {
        console.log({ doubleClick: event });
        openDateModal(); // Abre el modal al hacer doble clic en un evento
    };

    const onSelect = (event) => {
        onSetActiveEvent(event);
    };

    const onViewChanged = (event) => {
        console.log({ viewChanged: event });
    };



    return (
        <>
            <Calendar
                culture='es'
                defaultView='month'
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 'calc(100vh - 97px)' }}
                messages={getMessagesES()}
                eventPropGetter={eventStyleGetter}
                components={{
                    event: CalendarEvent,
                }}
                onDoubleClickEvent={onDoubleClick}
                onSelectEvent={onSelect}
                onView={onViewChanged}
            />
            <DialogDemo />
            <ButtonCalendar />
        </>
    );
}
