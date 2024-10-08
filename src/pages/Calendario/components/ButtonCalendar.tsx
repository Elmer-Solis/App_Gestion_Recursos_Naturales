import { Button } from "@/components/ui/button";
import { useCalendarStore } from "@/store/storeCalendario";

import { useUiStore } from "@/store/storeModalCalendario";

import { CirclePlus } from 'lucide-react';


export function ButtonCalendar() {
    const { openDateModal } = useUiStore();
    const { setSelectedEvent } = useCalendarStore();


    const handleClick = () => {
        setSelectedEvent(null); // Limpiar el evento seleccionado
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