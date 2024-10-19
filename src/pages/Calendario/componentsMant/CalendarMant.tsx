
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogFooter,

} from "@/components/ui/dialog";

import '../../../styles.css';


import { useMantenimiento } from "@/store/storeModalMant";


// Zonas disponibles para selección

export function DialogMant() {
    const { isMaintOpen, closeMaint } = useMantenimiento();


    const onSubmit = async (data) => {

        closeMaint();
    };

    return (
        <Dialog open={isMaintOpen} onOpenChange={(open) => {
            if (!open) closeMaint();
        }}>
            <DialogContent className="sm:max-w-[600px]">


                <DialogFooter>
                    <Button type="submit" className="btn btn-outline-primary btn-block">
                        <span>Guardar</span>
                    </Button>
                </DialogFooter>


            </DialogContent>
        </Dialog>
    );
}
