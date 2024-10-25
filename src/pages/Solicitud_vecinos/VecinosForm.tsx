import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useEffect } from "react";
import { useFontaneroStore } from "@/store/storeFontanero";
import { useBombaStore } from "@/store/storeBombas";
import { useSolicitudTrabajoStore } from "@/store/storeVecinos";
import { DatePickerDemo } from "./DatePicker";

// Definir el esquema de validación
const formSchema = z.object({
    numero_expediente: z.number(),
    nombre_solicitante: z.string()
        .min(2, { message: "El nombre es obligatorio." })
        .max(50, { message: "El nombre no debe ser mayor a 50 caracteres." }),
    tarifa: z.string({ message: "La tarifa es obligatoria." }),
    fecha_ingreso: z.string().refine((val) => !isNaN(Date.parse(val)), {
        message: "La fecha de ingreso debe ser una fecha válida.",
    }),
    fontanero: z.string().min(1, {
        message: "Debes seleccionar una bomba de agua.",
    }),
    bomba: z.string().min(1, {
        message: "Debes seleccionar una bomba de agua.",
    })
});



// Tipos de datos actualizados con los nuevos campos
export type SolicitudTrabajo = {
    id: string;
    numero_expediente: number;
    nombre_solicitante: string;
    tarifa: string;
    fecha_ingreso: string; // Fecha en formato ISO (string)
    fontanero_id: string | null;
    bomba_distribucion_id: string | null;
};

export type DraftSolicitudTrabajo = Omit<SolicitudTrabajo, 'id'>;


export function VecinosForm() {
    const { toast } = useToast();
    const { addSolicitud, updateSolicitud, activeSolicitudId, solicitudes } = useSolicitudTrabajoStore();
    const { fetchBombas, bombas } = useBombaStore();
    const { fetchFontaneros, fontaneros } = useFontaneroStore();

    const adjustToLocalDate = (dateString: string) => {
        const adjustedDate = adjustToLocalTime(dateString);
        const year = adjustedDate.getFullYear();
        const month = String(adjustedDate.getMonth() + 1).padStart(2, "0");
        const day = String(adjustedDate.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
    };

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            numero_expediente: 0,
            nombre_solicitante: "",
            tarifa: "",
            fecha_ingreso: adjustToLocalDate(new Date().toISOString()), // Usar la fecha ajustada
            fontanero: "",
            bomba: ""
        },
        mode: "onChange",
    });

    useEffect(() => {
        // Fetch de bombas y fontaneros al montar el componente
        fetchBombas();
        fetchFontaneros();
    }, [fetchBombas, fetchFontaneros]);

    function adjustToLocalTime(dateString: string) {
        const date = new Date(dateString);
        const offset = date.getTimezoneOffset();
        return new Date(date.getTime() - offset * 60000);
    }

    useEffect(() => {
        if (activeSolicitudId) {
            const activeSolicitud = solicitudes.find(solicitud => solicitud.id === activeSolicitudId);
            if (activeSolicitud) {
                form.setValue("numero_expediente", activeSolicitud.numero_expediente);
                form.setValue("nombre_solicitante", activeSolicitud.nombre_solicitante);
                form.setValue("tarifa", activeSolicitud.tarifa);
                form.setValue("fecha_ingreso", adjustToLocalDate(activeSolicitud.fecha_ingreso)); // Ajustar la fecha
                form.setValue("fontanero", activeSolicitud.fontanero_id ?? "");
                form.setValue("bomba", activeSolicitud.bomba_distribucion_id ?? "");
            }
        }
    }, [activeSolicitudId, solicitudes, form]);

    const registerSolicitud = (data: z.infer<typeof formSchema>) => {
        // Mapeo de campos 'fontanero' y 'bomba' a 'fontanero_id' y 'bomba_distribucion_id'
        const solicitudData: DraftSolicitudTrabajo = {
            numero_expediente: data.numero_expediente,
            nombre_solicitante: data.nombre_solicitante,
            tarifa: data.tarifa,
            fecha_ingreso: data.fecha_ingreso,
            fontanero_id: data.fontanero, // Aquí se asume que 'fontanero' ya contiene el id
            bomba_distribucion_id: data.bomba, // Aquí se asume que 'bomba' ya contiene el id
        };

        if (activeSolicitudId) {
            updateSolicitud(solicitudData);
            toast({
                variant: 'update',
                title: "Actualización Exitosa",
                description: "Solicitud Actualizada Correctamente",
            });
        } else {
            addSolicitud(solicitudData);
            toast({
                variant: 'succes',
                title: "Registro Exitoso",
                description: "Solicitud Registrada Correctamente",
            });
        }

        form.reset();
    };

    return (
        <div className="md:w-1/2 lg:w-2/5 mx-5">

            <Card>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(registerSolicitud)} className="py-10 px-5 space-y-5">
                        <FormField
                            control={form.control}
                            name="numero_expediente"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel htmlFor="numero_expediente">Número de Expediente</FormLabel>
                                    <FormControl>
                                        <Input
                                            id="numero_expediente"
                                            type="number"
                                            placeholder="Número de Expediente"
                                            {...field}
                                            onChange={(e) => field.onChange(Number(e.target.value))}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="nombre_solicitante"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel htmlFor="nombre_solicitante">Nombre del Solicitante</FormLabel>
                                    <FormControl>
                                        <Input id="nombre_solicitante" placeholder="Nombre del Solicitante" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="tarifa"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel htmlFor="tarifa">Tarifa</FormLabel>
                                    <FormControl>
                                        <Select
                                            onValueChange={(value) => field.onChange(value)}
                                            value={field.value}
                                        >
                                            <SelectTrigger className="w-full" id="tarifa">
                                                <SelectValue placeholder="Selecciona una tarifa" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Comercial">Comercial</SelectItem>
                                                <SelectItem value="Industrial">Industrial</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="bomba"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel htmlFor="bomba">Bomba de agua</FormLabel>
                                    <FormControl>
                                        <Select
                                            onValueChange={(value) => field.onChange(value)}
                                            value={field.value}
                                        >
                                            <SelectTrigger className="w-full" id="bomba">
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
                        <FormField
                            control={form.control}
                            name="fecha_ingreso"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel htmlFor="fecha_ingreso">Fecha de Ingreso</FormLabel>
                                    <FormControl>
                                        <Input id="fecha_ingreso" type="date" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="fontanero"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel htmlFor="fontanero">Fontanero</FormLabel>
                                    <FormControl>
                                        <Select
                                            onValueChange={(value) => field.onChange(value)}
                                            value={field.value}
                                        >
                                            <SelectTrigger className="w-full" id="fontanero">
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
                        <Button type="submit" className="uppercase text-white font-bold w-full">
                            Guardar Solicitud
                        </Button>
                    </form>
                </Form>
            </Card>
        </div>
    );
}
