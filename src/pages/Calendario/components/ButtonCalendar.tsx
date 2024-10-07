import { Button } from "@/components/ui/button";

import { useUiStore } from "@/store/storeModalCalendario";

import { CirclePlus } from 'lucide-react';


export function ButtonCalendar() {
    const { openDateModal } = useUiStore();

    const handleClick = () => {

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