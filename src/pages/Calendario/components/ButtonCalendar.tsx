import { Button } from "@/components/ui/button";
import { useCalendarStore } from "@/store/storeCalendario";
import { useUiStore } from "@/store/storeModalCalendario";
import { addHours } from "date-fns";
import { CirclePlus } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

export function ButtonCalendar() {
    const { openDateModal } = useUiStore();
    const { onSetActiveEvent } = useCalendarStore();

    const handleClick = () => {
        // Crear un nuevo evento con valores predeterminados
        const newEvent = {
            _id: uuidv4(),
            title: '',
            notes: '',
            start: new Date(),
            end: addHours(new Date(), 1), // Un evento de una hora por defecto
            bgColor: '#fafafa',
            user: {
                _id: '123', // Aquí podrías poner el ID de usuario actual
                name: 'Usuario', // Nombre del usuario actual
            },
        };

        console.log("Nuevo evento creado:", newEvent); // Verifica que el nuevo evento se esté creando correctamente
        // Establecer el nuevo evento como el evento activo y abrir el modal
        onSetActiveEvent(newEvent);
        openDateModal();
    };

    return (
        <Button
            className="fixed bottom-[55px] right-[55px] rounded-lg"
            onClick={handleClick}
        >
            <CirclePlus />
        </Button>
    );
}