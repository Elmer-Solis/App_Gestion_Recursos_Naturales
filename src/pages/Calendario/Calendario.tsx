import { Calendar } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { DialogDemo } from './components/CalendarModal';
import { localizer } from './helpers/calendarLocalizer';
import { getMessagesES } from './helpers/getMessages';
import { CalendarEvent } from './components/CalendarEvent';
import { useUiStore } from '@/store/storeModalCalendario';
import { ButtonCalendar } from './components/ButtonCalendar';
import { useCalendarStore } from '@/store/storeCalendario';


export function Calendario() {
    const { openDateModal } = useUiStore();
    const { events, addEvent, updateEvent, deleteEvent } = useCalendarStore();

    const eventStyleGetter = (event, start, end, isSelected) => {
        const style = {
            backgroundColor: '#347CF7',
            borderRadius: '0px',
            opacity: 0.8,
            color: 'white',
        };
        return { style };
    };

    const onDoubleClick = (event) => {
        console.log({ doubleClick: event });
        openDateModal();
    };

    const onSelect = (event) => {
        console.log({ onSelect: event });
    };

    const onViewChanged = (view) => {
        console.log({ viewChanged: view });
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
