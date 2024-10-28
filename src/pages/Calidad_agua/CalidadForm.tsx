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
import { useBombaStore } from "@/store/storeBombas";
import { useCalidadAguaStore } from "@/store/storeCalidadAgua";

const formSchema = z.object({
    bomba_id: z.string(),  // Obligatorio
    fecha_inspeccion: z.string()
        .refine((val) => !isNaN(Date.parse(val)), { message: "La fecha de inspección debe ser una fecha válida en formato ISO." })
        .optional(),  // Opcional
    nivel_ph: z.number()
        .min(0, { message: "El nivel de pH no puede ser menor a 0." })
        .max(14, { message: "El nivel de pH no puede ser mayor a 14." })
        .optional(),  // Opcional
    nivel_cloro: z.number()
        .min(0, { message: "El nivel de cloro no puede ser menor a 0." })
        .optional(),  // Opcional
    otras_metricas: z.string().optional()  // Opcional
});

export function CalidadForm() {

    const { toast } = useToast();
    const { activeCalidadId, registrosCalidad, updateCalidad, addCalidad, setActiveCalidadId } = useCalidadAguaStore();

    const { fetchBombas, bombas } = useBombaStore();

    const adjustToLocalDate = (dateString: string) => {
        const date = new Date(dateString);
        const offset = date.getTimezoneOffset();
        const adjustedDate = new Date(date.getTime() - offset * 60000);
        const year = adjustedDate.getFullYear();
        const month = String(adjustedDate.getMonth() + 1).padStart(2, "0");
        const day = String(adjustedDate.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
    };

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            bomba_id: "",  // Obligatorio, así que inicializamos como string vacía
            fecha_inspeccion: adjustToLocalDate(new Date().toISOString()),  // Predeterminado a la fecha actual
            nivel_ph: 0,  // Opcional
            nivel_cloro: 0,  // Opcional
            otras_metricas: ''  // Opcional
        },
        mode: "onChange",
    });

    useEffect(() => {
        fetchBombas();
    }, [fetchBombas]);

    useEffect(() => {
        if (activeCalidadId) {
            const activeCalidadAgua = registrosCalidad.find(calidad => calidad.id === activeCalidadId);
            if (activeCalidadAgua) {
                form.setValue("bomba_id", activeCalidadAgua.bomba_id);
                form.setValue("fecha_inspeccion", adjustToLocalDate(activeCalidadAgua.fecha_inspeccion));
                form.setValue("nivel_ph", activeCalidadAgua.nivel_ph);
                form.setValue("nivel_cloro", activeCalidadAgua.nivel_cloro);
                form.setValue("otras_metricas", activeCalidadAgua.otras_metricas);
            }
        }
    }, [activeCalidadId, registrosCalidad, form]);

    const registerSolicitud = async (data: z.infer<typeof formSchema>) => {
        const solicitudData = {
            bomba_id: data.bomba_id,
            fecha_inspeccion: data.fecha_inspeccion ?? "",
            nivel_ph: data.nivel_ph ?? 0,  // Si es undefined, asignar cadena vacía
            nivel_cloro: data.nivel_cloro ?? 0,  // Si es undefined, asignar cadena vacía
            otras_metricas: data.otras_metricas ?? "",  // Si es undefined, asignar cadena vacía
        };

        if (activeCalidadId) {
            await updateCalidad(solicitudData);
            toast({
                variant: 'update',
                title: "Actualización Exitosa",
                description: "Solicitud Actualizada Correctamente",
            });
            setActiveCalidadId(""); // Limpiar el ID activo después de la actualización;
        } else {
            await addCalidad(solicitudData);
            toast({
                variant: 'succes',
                title: "Registro Exitoso",
                description: "Solicitud Registrada Correctamente",
            });
        }
        form.reset()
    };

    return (
        <div className="md:w-1/2 lg:w-2/5 mx-5">
            <h2 className="font-black text-3xl text-center">Seguimiento Calidad Agua</h2>
            <p className="text-lg mt-5 text-center mb-10">
                Añade Parametros y {''}
                <span className="text-blue-500 font-bold">Administralos</span>
            </p>
            <Card>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(registerSolicitud)} className="py-10 px-5 space-y-5 ">

                        <FormField
                            control={form.control}
                            name="bomba_id"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel htmlFor="bomba_id">Bomba de agua</FormLabel>
                                    <FormControl>
                                        <Select
                                            onValueChange={(value) => field.onChange(value)}
                                            value={field.value}
                                        >
                                            <SelectTrigger className="w-full" id="bomba_id">
                                                <SelectValue placeholder="Elige una opción" />
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
                            name="fecha_inspeccion"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel htmlFor="fecha_inspeccion">Fecha de Inspeccion</FormLabel>
                                    <FormControl>
                                        <Input
                                            id="fecha_inspeccion"
                                            type="date"
                                            {...field}
                                            className="custom-datetime-input"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="nivel_ph"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel htmlFor="nivel_ph">Nivel Ph</FormLabel>
                                    <FormControl>
                                        <Input
                                            id="nivel_ph"
                                            type="number"
                                            placeholder="Nivel Ph"
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
                            name="nivel_cloro"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel htmlFor="nivel_cloro">Nivel Cloro</FormLabel>
                                    <FormControl>
                                        <Input
                                            id="nivel_cloro"
                                            type="number"
                                            placeholder="Nivel Cloro"
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
                            name="otras_metricas"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel htmlFor="otras_metricas">Otras Metricas</FormLabel>
                                    <FormControl>
                                        <Input
                                            id="otras_metricas"
                                            placeholder="Otras Metricas"
                                            {...field}
                                        />
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

    )
}
