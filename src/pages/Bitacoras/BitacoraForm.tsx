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
import { useBitacoraTomasStore } from "@/store/storeBitacoras";

const formSchema = z.object({
    id: z.string().optional(),
    zona_distribucion: z.string().optional(),
    total_tomas: z.number().optional(),
    tomas_usadas: z.number()
        .min(0, { message: "Las tomas usadas deben ser un número positivo." })
        .optional(),
    tomas_legales: z.number().optional(),
    latitud: z.string().optional(),
    longitud: z.string().optional(),
    fecha_registro: z.string()
        .refine((val) => !isNaN(Date.parse(val)), { message: "La fecha de registro debe ser una fecha válida." })
        .optional(),
    fontanero_id: z.string().optional(),
    notas: z.string()
        .max(200, { message: "Las notas no deben exceder los 200 caracteres." })
        .optional()
});

export function BitacoraForm() {

    const { toast } = useToast();
    const { activeBitacoraId, updateBitacora,
        addBitacora, setActiveBitacoraId, bitacoras } = useBitacoraTomasStore()
    const { fetchFontaneros, fontaneros } = useFontaneroStore();


    // Ajustar fecha a formato local
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
            zona_distribucion: "",
            total_tomas: 0,
            tomas_usadas: 0, // Obligatorio
            tomas_legales: 0,
            latitud: "",
            longitud: "",
            fecha_registro: adjustToLocalDate(new Date().toISOString()),
            fontanero_id: "",
            notas: ""
        },
        mode: "onChange",
    });

    useEffect(() => {
        // Fetch bombas y fontaneros al montar el componente

        fetchFontaneros();
    }, [fetchFontaneros]);

    useEffect(() => {
        if (activeBitacoraId) {
            const activeSolicitud = bitacoras.find(solicitud => solicitud.id === activeBitacoraId);
            if (activeSolicitud) {
                form.setValue("zona_distribucion", activeSolicitud.zona_distribucion);
                form.setValue("total_tomas", activeSolicitud.total_tomas);
                form.setValue("tomas_usadas", activeSolicitud.tomas_usadas);
                form.setValue("tomas_legales", activeSolicitud.tomas_legales);
                form.setValue("latitud", activeSolicitud.latitud);
                form.setValue("longitud", activeSolicitud.longitud);
                form.setValue("fecha_registro", adjustToLocalDate(activeSolicitud.fecha_registro));
                form.setValue("fontanero_id", activeSolicitud.fontanero_id ?? "");
                form.setValue("notas", activeSolicitud.notas);
            }
        }
    }, [activeBitacoraId, bitacoras, form]);

    const registerSolicitud = async (data: z.infer<typeof formSchema>) => {

        const solicitudData = {
            zona_distribucion: data.zona_distribucion ?? "",
            total_tomas: data.total_tomas ?? 0,
            tomas_usadas: data.tomas_usadas ?? 0,
            tomas_legales: data.tomas_legales ?? 0,
            latitud: data.latitud ?? "",
            longitud: data.longitud ?? "",
            fecha_registro: data.fecha_registro ?? "",
            fontanero_id: data.fontanero_id ?? "",
            notas: data.notas ?? ""
        };
        if (activeBitacoraId) {
            await updateBitacora(solicitudData);
            toast({
                variant: 'update',
                title: "Actualización Exitosa",
                description: "Solicitud Actualizada Correctamente",
            });
            setActiveBitacoraId(""); // Limpiar el ID activo después de la actualización;
        } else {
            await addBitacora(solicitudData);
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
            <h2 className="font-black text-3xl text-center">Seguimiento Bitacoras</h2>
            <p className="text-lg mt-5 text-center mb-10">
                Añade Bitacoras y {''}
                <span className="text-blue-500 font-bold">Administralos</span>
            </p>
            <Card>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(registerSolicitud)} className="py-10 px-5 space-y-5 ">

                        <div className="flex justify-between">
                            <FormField
                                control={form.control}
                                name="zona_distribucion"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel htmlFor="zona_distribucion">Zonas Distribucion</FormLabel>
                                        <FormControl>
                                            <Select
                                                onValueChange={(value) => field.onChange(value)}
                                                value={field.value}
                                            >
                                                <SelectTrigger className="w-full" id="zona">
                                                    <SelectValue placeholder="Elige una opción" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="zona_1">Zona 1</SelectItem>
                                                    <SelectItem value="zona_2">Zona 2</SelectItem>
                                                    <SelectItem value="zona_3">Zona 3</SelectItem>
                                                    <SelectItem value="zona_4">Zona 4</SelectItem>
                                                    <SelectItem value="santa_rita">Sant Rita</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="total_tomas"

                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel htmlFor="total_tomas">Total Tomas</FormLabel>
                                        <FormControl>
                                            <Input
                                                id="total_tomas"
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
                        </div>





                        <div className="flex justify-between">


                            <FormField
                                control={form.control}
                                name="tomas_usadas"

                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel htmlFor="tomas_usadas">Tomas Usadas</FormLabel>
                                        <FormControl>
                                            <Input
                                                id="tomas_usadas"
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
                                name="tomas_legales"

                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel htmlFor="tomas_legales">Tomas Legales</FormLabel>
                                        <FormControl>
                                            <Input
                                                id="tomas_legales"
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

                        </div>




                        <div className="flex  justify-between">
                            <FormField
                                control={form.control}
                                name="latitud"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel htmlFor="latitud">Latitud</FormLabel>
                                        <FormControl>
                                            <Input id="latitud"
                                                placeholder="Latitud"
                                                {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />


                            <FormField
                                control={form.control}
                                name="longitud"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel htmlFor="longitud">Longitud</FormLabel>
                                        <FormControl>
                                            <Input id="longitud"
                                                placeholder="Longitud"
                                                {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                        </div>


                        <div className="flex justify-between">


                            <FormField
                                control={form.control}
                                name="fecha_registro"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel htmlFor="fecha_registro">Fecha de Registro</FormLabel>
                                        <FormControl>
                                            <Input id="fecha_registro" type="date" {...field}
                                                className="custom-datetime-input"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />


                            <FormField
                                control={form.control}
                                name="fontanero_id"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel htmlFor="fontanero_id">Fontanero</FormLabel>
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
                        </div>

                        <div className="flex justify-center  flex-col items-center ">
                            <FormField
                                control={form.control}
                                name="notas"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel htmlFor="notas">Notas</FormLabel>
                                        <FormControl>
                                            <Input id="notas"
                                                className="w-96"
                                                placeholder="Notas"
                                                {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />


                        </div>
                        <Button type="submit" className="uppercase text-white font-bold w-full">
                            Guardar Solicitud
                        </Button>
                    </form>
                </Form>
            </Card>
        </div>
    )
}
