import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogTitle,
    DialogDescription
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useUiStore } from "@/store/storeModalCalendario";
import '../../../styles.css';
import { useCalendarStore } from "@/store/storeCalendario";
import { useEffect } from "react";
import { useFontaneroStore } from "@/store/storeFontanero";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

import { Checkbox } from "@/components/ui/checkbox";
// import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";

// Esquema de validación con Zod
const formSchema = z
    .object({
        title: z.string().min(2, { message: "El título debe tener al menos 2 caracteres." }),
        notes: z.string().optional(),
        horasExtras: z
            .preprocess((val) => val === '' ? 0 : Number(val), z.number({ invalid_type_error: "Debe ser un número." }))
            .optional(),
        start: z.string().refine((val) => val !== "" && !isNaN(Date.parse(val)), {
            message: "Fecha de inicio inválida.",
        }),
        end: z.string().refine((val) => val !== "" && !isNaN(Date.parse(val)), {
            message: "Fecha de fin inválida.",
        }),
        zonas: z.array(z.string()).min(1, { message: "Debe seleccionar al menos una zona." }),
        fontaneroId: z.string().min(1, { message: 'Debe seleccionar un fontanero.' }),
    })
    .refine((data) => new Date(data.end) >= new Date(data.start), {
        message: "La fecha de fin debe ser mayor o igual a la fecha de inicio.",
        path: ["end"],
    });

// Zonas disponibles para selección
const zonasDisponibles = [
    { id: 'zona-1', name: 'Zona 1' },
    { id: 'zona-2', name: 'Zona 2' },
    { id: 'zona-3', name: 'Zona 3' },
    { id: 'zona-4', name: 'Zona 4' },
    { id: 'santa-rita', name: 'Santa Rita' },
];

export function DialogDemo() {
    const { addEvent, selectedEvent, updateEvent, setSelectedEvent } = useCalendarStore();
    const { fontaneros, fetchFontaneros } = useFontaneroStore();
    const { isDateModalOpen, closeDateModal } = useUiStore();
    const { toast } = useToast();

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: selectedEvent
            ? {
                title: selectedEvent.title,
                notes: selectedEvent.notes || "",
                start: selectedEvent.start.toISOString().slice(0, 16),
                end: selectedEvent.end.toISOString().slice(0, 16),
                horasExtras: selectedEvent.horasExtras || 0,
                zonas: selectedEvent.zonas || [],  // Zonas seleccionadas por defecto
                fontaneroId: selectedEvent.fontaneroId ? selectedEvent.fontaneroId.toString() : "", // <-- Añadir fontaneroId aquí
            }
            : {
                title: "",
                notes: "",
                start: "",
                end: "",
                horasExtras: 0,
                zonas: [],  // Ninguna zona seleccionada por defecto
                fontaneroId: "", // <-- Inicializar fontaneroId en un nuevo evento
            },
    });

    useEffect(() => {
        fetchFontaneros();  // Agregar el fetch aquí
    }, [fetchFontaneros]);

    useEffect(() => {
        if (selectedEvent) {
            // Si hay un evento seleccionado, llena el formulario con sus datos
            form.reset({
                title: selectedEvent.title,
                notes: selectedEvent.notes || "",
                start: formatDateTimeLocal(selectedEvent.start),
                end: formatDateTimeLocal(selectedEvent.end),
                horasExtras: selectedEvent.horasExtras || 0,
                zonas: selectedEvent.zonas || [],
                fontaneroId: selectedEvent.fontaneroId ? selectedEvent.fontaneroId.toString() : "", // <-- Añadir fontaneroId aquí
            });
        } else {
            // Si no hay evento seleccionado, limpia el formulario
            form.reset({
                title: "",
                notes: "",
                start: "",
                end: "",
                horasExtras: 0,
                zonas: [],
                fontaneroId: "", // <-- Limpiar fontaneroId también
            });
        }
    }, [selectedEvent, form]);

    function formatDateTimeLocal(date: Date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        const hours = String(date.getHours()).padStart(2, "0");
        const minutes = String(date.getMinutes()).padStart(2, "0");
        return `${year}-${month}-${day}T${hours}:${minutes}`;
    }

    function adjustToLocalTime(dateString: string) {
        const date = new Date(dateString);
        const offset = date.getTimezoneOffset();
        return new Date(date.getTime() - offset * 60000);
    }

    const onSubmit = async (data: any) => {

        const start = adjustToLocalTime(data.start);
        const end = adjustToLocalTime(data.end);

        const newEvent = {
            id: selectedEvent ? selectedEvent.id : Date.now(),
            title: data.title,
            notes: data.notes,
            start,
            end,
            horasExtras: data.horasExtras,
            zonas: data.zonas,
            fontaneroId: data.fontaneroId,
        };

        if (selectedEvent) {
            await updateEvent(newEvent);
            toast({
                title: "Evento actualizado",
                variant: 'update',
                description: "El evento fue editado correctamente."
            });
        } else {
            await addEvent(newEvent); // Añade un nuevo evento
            toast({
                title: "Evento creado",
                variant: 'succes',
                description: "El evento fue creado correctamente."
            });
        }

        setSelectedEvent(null); // Limpiar el evento seleccionado después de guardar
        form.reset();
        closeDateModal();
    };

    return (
        <Dialog open={isDateModalOpen} onOpenChange={(open) => {
            if (!open) closeDateModal();
        }}>
            <DialogContent className="sm:max-w-[600px]">
                <DialogTitle>{selectedEvent ? "Editar Evento" : "Crear Evento"}</DialogTitle>
                <DialogDescription>
                    {selectedEvent ? "Edita los detalles del evento." : "Completa el formulario para agregar un nuevo evento."}
                </DialogDescription>

                {/* Aquí envuelves el formulario en <Form /> */}
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 py-4">
                        {/* Fecha y hora inicio */}
                        <div className="grid grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="start"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel htmlFor="start">Fecha y hora inicio</FormLabel>
                                        <FormControl>
                                            <Input
                                                id="start"
                                                type="datetime-local"
                                                {...field}
                                                className="form-control custom-datetime-input"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Fecha y hora fin */}
                            <FormField
                                control={form.control}
                                name="end"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel htmlFor="end">Fecha y hora fin</FormLabel>
                                        <FormControl>
                                            <Input
                                                id="end"
                                                type="datetime-local"
                                                {...field}
                                                className="form-control custom-datetime-input"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <hr />

                        {/* Título del evento */}
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel htmlFor="title">Título del evento</FormLabel>
                                    <FormControl>
                                        <Input
                                            id="title"
                                            type="text"
                                            placeholder="Título del evento"
                                            {...field}
                                            className="form-control"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Notas adicionales */}
                        <FormField
                            control={form.control}
                            name="notes"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel htmlFor="notes">Notas</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            id="notes"
                                            placeholder="Notas"
                                            rows={3}
                                            {...field}
                                            className="form-control"
                                        ></Textarea>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Horas Extras */}

                        <div className="grid grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="horasExtras"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel htmlFor="horasExtras" >Horas Extras</FormLabel>
                                        <FormControl>
                                            <Input
                                                id="horasExtras"
                                                type="number"
                                                {...field}
                                                className="form-control"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Selección de Fontanero */}
                            <FormField
                                control={form.control}
                                name="fontaneroId"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel >Selecciona un Fontanero</FormLabel>
                                        <FormControl>
                                            <Select
                                                onValueChange={(value) => field.onChange(value)}
                                                value={field.value}
                                            >
                                                <SelectTrigger id="fontaneroId" className="w-full">
                                                    <SelectValue placeholder="Selecciona un fontanero" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {fontaneros.map((fontanero) => (
                                                        <SelectItem key={fontanero.id} value={fontanero.id}>
                                                            {fontanero.name}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <FormField
                            control={form.control}
                            name="zonas"
                            render={() => (
                                <FormItem>
                                    <div className="mb-4">
                                        <FormLabel className="text-base" htmlFor="zonas">Selecciona la zona</FormLabel>
                                        {/* <FormDescription>
                                            Selecciona las zonas a las que la bomba va a distribuir agua.
                                        </FormDescription> */}
                                    </div>
                                    {zonasDisponibles.map((zona) => (
                                        <FormField
                                            key={zona.id}
                                            control={form.control}
                                            name="zonas"
                                            render={({ field }) => (
                                                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                                    <FormControl>
                                                        <Checkbox
                                                            checked={field.value?.includes(zona.id)}
                                                            onCheckedChange={(checked) => {
                                                                // Actualiza `zonas` según el estado del checkbox
                                                                field.onChange(
                                                                    checked
                                                                        ? [...(field.value || []), zona.id]
                                                                        : field.value?.filter((value) => value !== zona.id)
                                                                );
                                                            }}
                                                        />
                                                    </FormControl>
                                                    <FormLabel className="font-normal">{zona.name}</FormLabel>
                                                </FormItem>
                                            )}
                                        />
                                    ))}
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <DialogFooter>
                            <Button type="submit" className="btn btn-outline-primary btn-block">
                                <span>Guardar</span>
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
