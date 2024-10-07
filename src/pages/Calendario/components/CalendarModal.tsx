
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useUiStore } from "@/store/storeModalCalendario";
import { useEffect } from "react";
import '../../../styles.css';
import { useCalendarStore } from "@/store/storeCalendario";

// Esquema de validación con Zod
const formSchema = z
    .object({
        title: z.string().min(2, { message: "El título debe tener al menos 2 caracteres." }),
        notes: z.string().optional(),
        start: z.string().refine((val) => val !== "" && !isNaN(Date.parse(val)), {
            message: "Fecha de inicio inválida.",
        }),
        end: z.string().refine((val) => val !== "" && !isNaN(Date.parse(val)), {
            message: "Fecha de fin inválida.",
        }),
    })
    .refine((data) => new Date(data.end) >= new Date(data.start), {
        message: "La fecha de fin debe ser mayor o igual a la fecha de inicio.",
        path: ["end"],
    });

export function DialogDemo() {

    const { onSetActiveEvent, activeEvent } = useCalendarStore();
    const { isDateModalOpen, closeDateModal } = useUiStore();
    const { toast } = useToast();

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            notes: "",
            start: "",
            end: "",
        },
    });
    function formatDateToInput(date: Date): string {
        return new Date(date).toISOString().slice(0, 16); // Formato YYYY-MM-DDTHH:MM
    }

    // Efecto para cargar el evento activo
    useEffect(() => {
        if (activeEvent !== null) {
            form.setValue("title", activeEvent.title || "");
            form.setValue("notes", activeEvent.notes || "");
            form.setValue("start", activeEvent.start ? formatDateToInput(new Date(activeEvent.start)) : "");
            form.setValue("end", activeEvent.end ? formatDateToInput(new Date(activeEvent.end)) : "");
        }
    }, [activeEvent, form]);

    const onSubmit = (data) => {
        if (form.formState.errors.title || form.formState.errors.start || form.formState.errors.end) {
            toast({
                title: "Error",
                description: "Revisa los campos requeridos y asegúrate de que la fecha de fin sea mayor a la de inicio.",
                variant: "destructive",
            });
        } else {
            toast({
                title: "Éxito",
                description: "Todos los campos están completos, el evento se guardó correctamente.",
                variant: "succes",
            });

            // Lógica para guardar el evento
            console.log(data);

            // Lógica para agregar o actualizar el evento
            if (activeEvent) {
                onSetActiveEvent(data); // Actualiza el evento activo
            } else {
                // Lógica para crear un nuevo evento
            }

            // Reinicia el formulario después de enviarlo
            form.reset({
                title: "",
                notes: "",
                start: "",
                end: "",
            });

            // Cerramos el modal después de guardar
            closeDateModal();
        }
    };

    return (
        <Dialog open={isDateModalOpen} onOpenChange={(open) => {
            if (!open) closeDateModal();
        }}>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>{activeEvent ? "Editar evento" : "Nuevo evento"}</DialogTitle>
                    <DialogDescription>
                        Llena los detalles para {activeEvent ? "editar" : "crear"} un evento. Haz clic en guardar cuando termines.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 py-4">
                    {/* Fecha y hora inicio */}
                    <div className="grid grid-cols-1 gap-2">
                        <Label htmlFor="start">Fecha y hora inicio</Label>
                        <Input
                            id="start" // Asegurarse de que el id coincida con htmlFor
                            type="datetime-local"
                            {...form.register("start")}
                            className="form-control custom-datetime-input "
                        />
                        {form.formState.errors.start && (
                            <p className="text-red-500 text-sm">
                                {form.formState.errors.start.message}
                            </p>
                        )}
                    </div>

                    {/* Fecha y hora fin */}
                    <div className="grid grid-cols-1 gap-2">
                        <Label htmlFor="end">Fecha y hora fin</Label>
                        <Input
                            id="end" // Asegurarse de que el id coincida con htmlFor
                            type="datetime-local"
                            {...form.register("end")}
                            className="form-control custom-datetime-input "
                        />
                        {form.formState.errors.end && (
                            <p className="text-red-500 text-sm">
                                {form.formState.errors.end.message}
                            </p>
                        )}
                    </div>

                    <hr />

                    {/* Título del evento */}
                    <div className="grid grid-cols-1 gap-2">
                        <Label htmlFor="title">Título y notas</Label>
                        <Input
                            id="title" // Asegurarse de que el id coincida con htmlFor
                            type="text"
                            placeholder="Título del evento"
                            {...form.register("title")}
                            className="form-control"
                        />
                        {form.formState.errors.title && (
                            <p className="text-red-500 text-sm">
                                {form.formState.errors.title.message}
                            </p>
                        )}
                    </div>

                    {/* Notas adicionales */}
                    <div className="grid grid-cols-1 gap-2">
                        <Label htmlFor="notes">Notas</Label>
                        <Textarea
                            id="notes" // Asegurarse de que el id coincida con htmlFor
                            placeholder="Notas"
                            rows={5}
                            {...form.register("notes")}
                            className="form-control"
                        ></Textarea>
                    </div>

                    <DialogFooter>
                        <Button type="submit" className="btn btn-outline-primary btn-block">
                            <span>Guardar</span>
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );

}
