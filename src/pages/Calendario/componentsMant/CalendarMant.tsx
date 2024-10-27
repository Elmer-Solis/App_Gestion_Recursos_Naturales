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
import '../../../styles.css';

import { useEffect } from "react";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { useBombaStore } from "@/store/storeBombas";
import { useMantenimiento } from "@/store/storeModalMant";
import { useMantenimientoStore } from "@/store/storeCalendarioMant";

// Esquema de validación con Zod
const formSchema = z
    .object({
        titulo: z.string().min(2, { message: "El título debe tener al menos 2 caracteres." }),
        notas: z.string().optional(),
        costo: z
            .preprocess((val) => val === '' ? 0 : Number(val), z.number({ invalid_type_error: "Debe ser un número." }))
            .optional(),
        iniciom: z.string().refine((val) => val !== "" && !isNaN(Date.parse(val)), {
            message: "Fecha de inicio inválida.",
        }),
        finm: z.string().refine((val) => val !== "" && !isNaN(Date.parse(val)), {
            message: "Fecha de fin inválida.",
        }),
        tiposmant: z.string().min(1, { message: "Debe seleccionar un tipo de mantenimiento." }), // Cambiado de array a string
        bombaId: z.string().min(1, { message: 'Debe seleccionar una bomba.' }),
    })
    .refine((data) => new Date(data.finm) >= new Date(data.iniciom), {
        message: "La fecha de fin debe ser mayor o igual a la fecha de inicio.",
        path: ["end"],
    });

// Zonas disponibles para selección
const tiposMantenimiento = [
    { id: 'preventivo', name: 'Preventivo' },
    { id: 'correctivo', name: 'Correctivo' },
];

export function DialogMant() {
    const { addMantenimiento, selectedMantenimiento, updateMantenimiento, setSelectedMantenimiento } = useMantenimientoStore();
    const { bombas, fetchBombas } = useBombaStore();
    const { toast } = useToast();
    const { isMaintOpen, closeMaint } = useMantenimiento();

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: selectedMantenimiento
            ? {
                titulo: selectedMantenimiento.titulo_mantenimiento,
                notas: selectedMantenimiento.notasMantenimiento || "",
                iniciom: selectedMantenimiento.fechaInicioMantenimiento.toISOString().slice(0, 16),
                finm: selectedMantenimiento.fechaFinMantenimiento.toISOString().slice(0, 16),
                costo: selectedMantenimiento.costo || 0,
                tiposmant: selectedMantenimiento.tipoMantenimiento || "",  // Cambiado a string
                bombaId: selectedMantenimiento.bombaId ? selectedMantenimiento.bombaId.toString() : "", // <-- Añadir fontaneroId aquí
            }
            : {
                titulo: "",
                notas: "",
                iniciom: "",
                finm: "",
                costo: 0,
                tiposmant: "",  // Ninguna zona seleccionada por defecto
                bombaId: "", // <-- Inicializar fontaneroId en un nuevo evento
            },
    });

    useEffect(() => {
        fetchBombas();  // Agregar el fetch aquí
    }, [fetchBombas]);

    useEffect(() => {
        if (selectedMantenimiento) {
            // Si hay un evento seleccionado, llena el formulario con sus datos
            form.reset({
                titulo: selectedMantenimiento.titulo_mantenimiento,
                notas: selectedMantenimiento.notasMantenimiento || "",
                iniciom: formatDateTimeLocal(selectedMantenimiento.fechaInicioMantenimiento),
                finm: formatDateTimeLocal(selectedMantenimiento.fechaFinMantenimiento),
                costo: selectedMantenimiento.costo || 0,
                tiposmant: selectedMantenimiento.tipoMantenimiento || '',
                bombaId: selectedMantenimiento.bombaId ? selectedMantenimiento.bombaId.toString() : "", // <-- Añadir fontaneroId aquí
            });
        } else {
            // Si no hay evento seleccionado, limpia el formulario
            form.reset({
                titulo: "",
                notas: "",
                iniciom: "",
                finm: "",
                costo: 0,
                tiposmant: '',
                bombaId: "", // <-- Limpiar fontaneroId también
            });
        }
    }, [selectedMantenimiento, form]);

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
        const start = adjustToLocalTime(data.iniciom); // Usar `iniciom` en lugar de `start`
        const end = adjustToLocalTime(data.finm); // Usar `finm` en lugar de `end`

        const newEvent = {
            id: selectedMantenimiento ? selectedMantenimiento.id : Date.now(),
            titulo_mantenimiento: data.titulo, // Cambiado a `titulo_mantenimiento`
            notasMantenimiento: data.notas, // Cambiado a `notasMantenimiento`
            fechaInicioMantenimiento: start, // Cambiado a `fechaInicioMantenimiento`
            fechaFinMantenimiento: end, // Cambiado a `fechaFinMantenimiento`
            costo: data.costo,
            tipoMantenimiento: data.tiposmant, // Cambiado a `tipoMantenimiento`
            bombaId: data.bombaId, // Asignar `bombaId` correctamente
        };

        if (selectedMantenimiento) {
            await updateMantenimiento(newEvent);
            toast({
                title: "Evento actualizado",
                variant: 'update',
                description: "El evento fue editado correctamente."
            });
        } else {
            await addMantenimiento(newEvent);
            toast({
                title: "Evento creado",
                variant: 'succes',
                description: "El evento fue creado correctamente."
            });
        }

        setSelectedMantenimiento(null);
        form.reset();
        closeMaint();
    };

    return (
        <Dialog open={isMaintOpen} onOpenChange={(open) => {
            if (!open) closeMaint();
        }}>
            <DialogContent className="sm:max-w-[600px]">
                <DialogTitle>{selectedMantenimiento ? "Editar Evento" : "Crear Evento Mantenimiento"}</DialogTitle>
                <DialogDescription>
                    {selectedMantenimiento ? "Edita los detalles del evento." : "Completa el formulario para agregar un nuevo evento."}
                </DialogDescription>

                {/* Aquí envuelves el formulario en <Form /> */}
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 py-4">
                        {/* Fecha y hora inicio */}
                        <div className="grid grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="iniciom"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel htmlFor="start">Fecha y hora inicio Mantenimiento</FormLabel>
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
                                name="finm"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel htmlFor="end">Fecha y hora fin Mantenimiento</FormLabel>
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
                            name="titulo"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel htmlFor="title">Título de Mantenimiento</FormLabel>
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
                            name="notas"
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
                                name="costo"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel htmlFor="horasExtras" >Costo Mantenimiento</FormLabel>
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
                                name="bombaId"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel >Selecciona una Bomba</FormLabel>
                                        <FormControl>
                                            <Select
                                                onValueChange={(value) => field.onChange(value)}
                                                value={field.value}
                                            >
                                                <SelectTrigger id="fontaneroId" className="w-full">
                                                    <SelectValue placeholder="Selecciona una bomba" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {bombas.map((bomba) => (
                                                        <SelectItem key={bomba.id} value={bomba.id}>
                                                            {bomba.name}
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
                            name="tiposmant"
                            render={({ field }) => (
                                <FormItem>
                                    <div className="mb-4">
                                        <FormLabel className="text-base" htmlFor="tiposmant">
                                            Selecciona tipo de mantenimiento
                                        </FormLabel>
                                    </div>
                                    <FormControl>
                                        <Select
                                            onValueChange={(value) => field.onChange(value)} // Ahora es un string
                                            value={field.value} // Asegúrate de que sea un string
                                        >
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Selecciona un tipo de mantenimiento" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {tiposMantenimiento.map((mantenimiento) => (
                                                    <SelectItem key={mantenimiento.id} value={mantenimiento.id}>
                                                        {mantenimiento.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
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
