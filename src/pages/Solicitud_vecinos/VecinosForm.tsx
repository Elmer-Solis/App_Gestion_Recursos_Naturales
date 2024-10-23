
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
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

import { useSolicitudTrabajoStore } from "@/store/storeVecinos";

// Esquema de validación con Zod para `SolicitudTrabajo`
const formSchema = z
    .object({
        tituloSolicitud: z.string().min(2, { message: "El título debe tener al menos 2 caracteres." }),
        descripcionSolicitud: z.string().optional(),
        fechaSolicitud: z.string().refine((val) => val !== "" && !isNaN(Date.parse(val)), {
            message: "Fecha de solicitud inválida.",
        }),
        estadoSolicitud: z.string().min(1, { message: "Debe seleccionar un estado de solicitud." }),
        vecinoNombre: z.string().min(1, { message: "El nombre del vecino es obligatorio." }),
        direccionVecino: z.string().min(1, { message: "La dirección del vecino es obligatoria." }),
    });

const estadosSolicitud = [
    { id: 'urgente', name: 'Urgente' },
    { id: 'alta_prioridad', name: 'Alta prioridad' },
    { id: 'baja_prioridad', name: 'Baja prioridad' },
];

export function VecinosForm() {
    const { addSolicitud, selectedSolicitud, updateSolicitud, setSelectedSolicitud } = useSolicitudTrabajoStore();

    const { toast } = useToast();
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: selectedSolicitud
            ? {
                tituloSolicitud: selectedSolicitud.tituloSolicitud,
                descripcionSolicitud: selectedSolicitud.descripcionSolicitud || "",
                fechaSolicitud: selectedSolicitud.fechaSolicitud.toISOString().slice(0, 16),
                estadoSolicitud: selectedSolicitud.estadoSolicitud || "",
                vecinoNombre: selectedSolicitud.vecinoNombre,
                direccionVecino: selectedSolicitud.direccionVecino,

            }
            : {
                tituloSolicitud: "",
                descripcionSolicitud: "",
                fechaSolicitud: "",
                estadoSolicitud: "",
                vecinoNombre: "",
                direccionVecino: "",

            },
    });


    useEffect(() => {
        if (selectedSolicitud) {
            // Si hay una solicitud seleccionada, llena el formulario con sus datos
            form.reset({
                tituloSolicitud: selectedSolicitud.tituloSolicitud,
                descripcionSolicitud: selectedSolicitud.descripcionSolicitud || "",
                fechaSolicitud: formatDateTimeLocal(selectedSolicitud.fechaSolicitud),
                estadoSolicitud: selectedSolicitud.estadoSolicitud || '',
                vecinoNombre: selectedSolicitud.vecinoNombre,
                direccionVecino: selectedSolicitud.direccionVecino,

            });
        } else {
            // Si no hay solicitud seleccionada, limpia el formulario
            form.reset({
                tituloSolicitud: "",
                descripcionSolicitud: "",
                fechaSolicitud: "",
                estadoSolicitud: "",
                vecinoNombre: "",
                direccionVecino: "",

            });
        }
    }, [selectedSolicitud, form]);

    function formatDateTimeLocal(date: Date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        const hours = String(date.getHours()).padStart(2, "0");
        const minutes = String(date.getMinutes()).padStart(2, "0");
        return `${year}-${month}-${day}T${hours}:${minutes}`;
    }

    const onSubmit = async (data: any) => {
        const fecha = new Date(data.fechaSolicitud);

        const newSolicitud = {
            id: selectedSolicitud ? selectedSolicitud.id : Date.now(),
            tituloSolicitud: data.tituloSolicitud,
            descripcionSolicitud: data.descripcionSolicitud,
            fechaSolicitud: fecha,
            estadoSolicitud: data.estadoSolicitud,
            vecinoNombre: data.vecinoNombre,
            direccionVecino: data.direccionVecino,
        };

        if (selectedSolicitud) {
            await updateSolicitud(newSolicitud);
            toast({
                title: "Solicitud actualizada",
                variant: 'update',
                description: "La solicitud fue editada correctamente."
            });
        } else {
            await addSolicitud(newSolicitud);
            toast({
                title: "Solicitud creada",
                variant: 'succes',
                description: "La solicitud fue creada correctamente."
            });
        }

        setSelectedSolicitud(null);
        form.reset();
    };

    return (
        <div className="md:w-1/2 lg:w-2/5 mx-5" >

            {/* Formulario con React Hook Form y Zod */}

            <Card>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="py-10 px-5 space-y-5">
                        {/* Fecha de solicitud */}
                        <FormField
                            control={form.control}
                            name="fechaSolicitud"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel htmlFor="fechaSolicitud">Fecha de Solicitud</FormLabel>
                                    <FormControl>
                                        <Input
                                            id="fechaSolicitud"
                                            type="datetime-local"
                                            {...field}
                                            className="form-control custom-datetime-input"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Título de la solicitud */}
                        <FormField
                            control={form.control}
                            name="tituloSolicitud"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel htmlFor="tituloSolicitud">Título de la Solicitud</FormLabel>
                                    <FormControl>
                                        <Input
                                            id="tituloSolicitud"
                                            type="text"
                                            placeholder="Título de la solicitud"
                                            {...field}
                                            className="form-control"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Descripción */}
                        <FormField
                            control={form.control}
                            name="descripcionSolicitud"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel htmlFor="descripcionSolicitud">Descripción</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            id="descripcionSolicitud"
                                            placeholder="Descripción"
                                            rows={3}
                                            {...field}
                                            className="form-control"
                                        ></Textarea>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Estado de la solicitud */}
                        <FormField
                            control={form.control}
                            name="estadoSolicitud"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Estado de la Solicitud</FormLabel>
                                    <FormControl>
                                        <Select
                                            onValueChange={(value) => field.onChange(value)}
                                            value={field.value}
                                        >
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Selecciona un estado" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {estadosSolicitud.map((estado) => (
                                                    <SelectItem key={estado.id} value={estado.id}>
                                                        {estado.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Vecino */}
                        <FormField
                            control={form.control}
                            name="vecinoNombre"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nombre del Vecino</FormLabel>
                                    <FormControl>
                                        <Input
                                            id="vecinoNombre"
                                            type="text"
                                            placeholder="Nombre del vecino"
                                            {...field}
                                            className="form-control"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Dirección */}
                        <FormField
                            control={form.control}
                            name="direccionVecino"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Dirección del Vecino</FormLabel>
                                    <FormControl>
                                        <Input
                                            id="direccionVecino"
                                            type="text"
                                            placeholder="Dirección"
                                            {...field}
                                            className="form-control"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />


                        <Button type="submit" className="uppercase text-white font-bold w-full">
                            <span>Guardar Solicitud</span>
                        </Button>

                    </form>
                </Form>
            </Card>
        </div>
    );
}
