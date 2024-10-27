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
import { useSolicitudVecinoStore } from "@/store/storeSolicitud";

const formSchema = z.object({
    numero_expediente: z.string(),  // Obligatorio
    nombre_solicitante: z.string()
        .min(2, { message: "El nombre es obligatorio." })
        .max(50, { message: "El nombre no debe ser mayor a 50 caracteres." }),
    fecha_ingreso: z.string()
        .optional()
        .refine((val) => !val || !isNaN(Date.parse(val)), { message: "La fecha de ingreso debe ser una fecha válida." }),
    // Obligatorio
    direccion: z.string().optional(),
    telefono: z.number().int().positive({ message: "El teléfono debe ser un número positivo." }).optional(),
    nombre_sindico_acompanio: z.string().optional(),
    fecha_inspeccion: z.string()
        .optional()
        .refine((val) => !val || !isNaN(Date.parse(val)), { message: "La fecha de inspección debe ser válida." }),
    numero_recibo: z.number().int().optional(),
    monto: z.number().positive({ message: "El monto debe ser positivo." }).optional(),
    fecha_recibo: z.string()
        .optional()
        .refine((val) => !val || !isNaN(Date.parse(val)), { message: "La fecha de recibo debe ser válida." }),
    numero_orden_instalacion: z.number().int().optional(),
    fecha_instalacion: z.string()
        .optional()
        .refine((val) => !val || !isNaN(Date.parse(val)), { message: "La fecha de instalación debe ser válida." }),
    fontanero_id: z.string().optional(),
    observacion: z.string().optional(),
    numero_servicios: z.number().int().positive({ message: "El número de servicios debe ser positivo." }).optional(),
    bomba_distribucion_id: z.string().optional(),
    tarifa: z.string().optional(),
    drenaje: z.string().optional(),
    numero_recibo_drenaje: z.number().int().optional(),
    monto_drenaje: z.number().optional(),
    levanto_adoquin: z.string().optional(),
    numero_recibo_garantia: z.number().int().optional(),
    deposito_garantia: z.string().optional(),
    numero_medidor: z.string().optional()
});
export const SvecinosForm = () => {

    const { toast } = useToast();
    const { addSolicitud, updateSolicitud, activeSolicitudId, solicitudes, setActiveSolicitudId } = useSolicitudVecinoStore();
    const { fetchBombas, bombas } = useBombaStore();
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
            numero_expediente: "",               // Obligatorio
            nombre_solicitante: "",              // Obligatorio
            direccion: "",                       // Opcional
            telefono: 0,                 // Opcional
            nombre_sindico_acompanio: "",        // Opcional
            fecha_ingreso: adjustToLocalDate(new Date().toISOString()),  // Opcional con valor inicial
            fecha_inspeccion: adjustToLocalDate(new Date().toISOString()),                // Opcional
            numero_recibo: 0,            // Opcional
            monto: 0,                    // Opcional
            fecha_recibo: adjustToLocalDate(new Date().toISOString()),                    // Opcional
            numero_orden_instalacion: 0, // Opcional
            fecha_instalacion: adjustToLocalDate(new Date().toISOString()),               // Opcional
            fontanero_id: "",                  // Opcional
            observacion: "",                     // Opcional
            numero_servicios: 0,         // Opcional
            bomba_distribucion_id: "",         // Opcional
            tarifa: "",                          // Opcional
            drenaje: "",                         // Opcional
            numero_recibo_drenaje: 0,    // Opcional
            monto_drenaje: 0,            // Opcional
            levanto_adoquin: "",                 // Opcional
            numero_recibo_garantia: 0,   // Opcional
            deposito_garantia: "",               // Opcional
            numero_medidor: ""                   // Opcional
        },
        mode: "onChange",
    });

    useEffect(() => {
        if (activeSolicitudId) {
            const activeSolicitud = solicitudes.find(solicitud => solicitud.id === activeSolicitudId);
            if (activeSolicitud) {
                form.setValue("numero_expediente", activeSolicitud.numero_expediente);
                form.setValue("nombre_solicitante", activeSolicitud.nombre_solicitante);
                form.setValue("direccion", activeSolicitud.direccion);
                form.setValue("telefono", activeSolicitud.telefono);
                form.setValue("nombre_sindico_acompanio", activeSolicitud.nombre_sindico_acompanio);
                form.setValue("fecha_ingreso", adjustToLocalDate(activeSolicitud.fecha_ingreso));
                form.setValue("fecha_inspeccion", adjustToLocalDate(activeSolicitud.fecha_inspeccion));
                form.setValue("numero_recibo", activeSolicitud.numero_recibo);
                form.setValue("monto", activeSolicitud.monto);
                form.setValue("fecha_recibo", adjustToLocalDate(activeSolicitud.fecha_recibo));
                form.setValue("numero_orden_instalacion", activeSolicitud.numero_orden_instalacion);
                form.setValue("fecha_instalacion", adjustToLocalDate(activeSolicitud.fecha_instalacion));
                form.setValue("fontanero_id", activeSolicitud.fontanero_id ?? "");
                form.setValue("observacion", activeSolicitud.observacion);
                form.setValue("numero_servicios", activeSolicitud.numero_servicios);
                form.setValue("bomba_distribucion_id", activeSolicitud.bomba_distribucion_id ?? "");
                form.setValue("tarifa", activeSolicitud.tarifa);
                form.setValue("drenaje", activeSolicitud.drenaje);
                form.setValue("numero_recibo_drenaje", activeSolicitud.numero_recibo_drenaje);
                form.setValue("monto_drenaje", activeSolicitud.monto_drenaje);
                form.setValue("levanto_adoquin", activeSolicitud.levanto_adoquin);
                form.setValue("numero_recibo_garantia", activeSolicitud.numero_recibo_garantia);
                form.setValue("deposito_garantia", activeSolicitud.deposito_garantia);
                form.setValue("numero_medidor", activeSolicitud.numero_medidor);
            }
        }
    }, [activeSolicitudId, solicitudes, form]);

    useEffect(() => {
        // Fetch bombas y fontaneros al montar el componente
        fetchBombas();
        fetchFontaneros();
    }, [fetchBombas, fetchFontaneros]);


    const registrarSolicitud = async (data: z.infer<typeof formSchema>) => {
        const solicitudData = {
            numero_expediente: data.numero_expediente,                // Obligatorio
            nombre_solicitante: data.nombre_solicitante,              // Obligatorio
            direccion: data.direccion ?? "",                          // Opcional
            telefono: data.telefono ?? 0,                            // Opcional
            nombre_sindico_acompanio: data.nombre_sindico_acompanio ?? "",  // Opcional
            fecha_ingreso: data.fecha_ingreso ?? "",                  // Opcional
            fecha_inspeccion: data.fecha_inspeccion ?? "",            // Opcional
            numero_recibo: data.numero_recibo ?? 0,                  // Opcional
            monto: data.monto ?? 0,                                  // Opcional
            fecha_recibo: data.fecha_recibo ?? "",                    // Opcional
            numero_orden_instalacion: data.numero_orden_instalacion ?? 0,  // Opcional
            fecha_instalacion: data.fecha_instalacion ?? "",          // Opcional
            fontanero_id: data.fontanero_id ?? "",                       // Opcional
            observacion: data.observacion ?? "",                      // Opcional
            numero_servicios: data.numero_servicios ?? 0,            // Opcional
            bomba_distribucion_id: data.bomba_distribucion_id ?? "",                  // Opcional
            tarifa: data.tarifa ?? "",                                // Opcional
            drenaje: data.drenaje ?? "",                              // Opcional
            numero_recibo_drenaje: data.numero_recibo_drenaje ?? 0,  // Opcional
            monto_drenaje: data.monto_drenaje ?? 0,                  // Opcional
            levanto_adoquin: data.levanto_adoquin ?? "",              // Opcional
            numero_recibo_garantia: data.numero_recibo_garantia ?? 0, // Opcional
            deposito_garantia: data.deposito_garantia ?? "",          // Opcional
            numero_medidor: data.numero_medidor ?? ""                 // Opcional
        };

        if (activeSolicitudId) {
            await updateSolicitud(solicitudData);
            toast({
                variant: 'update',
                title: "Actualización Exitosa",
                description: "Solicitud Actualizada Correctamente",
            });
            // Limpiar el activeSolicitudId y resetear el formulario
            setActiveSolicitudId(""); // Limpiar el ID activo después de la actualización;
        } else {
            await addSolicitud(solicitudData);
            toast({
                variant: 'succes',
                title: "Registro Exitoso",
                description: "Solicitud Registrada Correctamente",
            });
            // Resetear el formulario después del registro;
        }
        form.reset()
    };

    return (
        <div className="md:w-3/5 lg:w-3/5 mx-5">
            <Card>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(registrarSolicitud)} className="py-10 px-5 space-y-10">

                        <div className="flex justify-between ">
                            <FormField
                                control={form.control}
                                name="numero_expediente"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel htmlFor="numero_expediente">Número de Expediente</FormLabel>
                                        <FormControl>
                                            <Input
                                                id="numero_expediente"
                                                placeholder="Número de Expediente"
                                                {...field}
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
                                        <FormLabel htmlFor="nombre_solicitante">Nombre Solicitante</FormLabel>
                                        <FormControl>
                                            <Input
                                                id="nombre_solicitante"
                                                placeholder="Nombre Solicitante"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="telefono"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel htmlFor="telefono">Teléfono</FormLabel>
                                        <FormControl>
                                            <Input
                                                id="telefono"
                                                type="number"
                                                placeholder="Teléfono"
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
                                name="direccion"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel htmlFor="direccion">Direccion</FormLabel>
                                        <FormControl>
                                            <Input
                                                id="direccion"
                                                placeholder="Direccion"
                                                {...field}
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
                                name="nombre_sindico_acompanio"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel htmlFor="nombre_sindico_acompanio">Nombre Síndico</FormLabel>
                                        <FormControl>
                                            <Select
                                                onValueChange={(value) => field.onChange(value)}
                                                value={field.value}
                                            >
                                                <SelectTrigger className="w-full" id="nombre_sindico_acompanio">
                                                    <SelectValue placeholder="Elige una opción" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="Sindico_I">Sindico I</SelectItem>
                                                    <SelectItem value="Sindicio_II">Sindico II</SelectItem>
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
                                            <Input
                                                id="fecha_ingreso"
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
                                name="fecha_inspeccion"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel htmlFor="fecha_inspeccion">Fecha de Inspección</FormLabel>
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
                                name="numero_recibo"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel htmlFor="numero_recibo">Número de Recibo</FormLabel>
                                        <FormControl>
                                            <Input
                                                id="numero_recibo"
                                                type="number"
                                                placeholder="Número de Recibo"
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
                                name="monto"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel htmlFor="monto">Monto</FormLabel>
                                        <FormControl>
                                            <Input
                                                id="monto"
                                                type="number"
                                                placeholder="Monto"
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
                                name="fecha_recibo"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel htmlFor="fecha_recibo">Fecha de Recibo</FormLabel>
                                        <FormControl>
                                            <Input
                                                id="fecha_recibo"
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
                                name="numero_orden_instalacion"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel htmlFor="numero_orden_instalacion">Número de Orden de Instalación</FormLabel>
                                        <FormControl>
                                            <Input
                                                id="numero_orden_instalacion"
                                                type="number"
                                                placeholder="Número de Orden de Instalación"
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
                                name="fecha_instalacion"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel htmlFor="fecha_instalacion">Fecha de Instalación</FormLabel>
                                        <FormControl>
                                            <Input
                                                id="fecha_instalacion"
                                                type="date"
                                                {...field}
                                                className="custom-datetime-input"
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
                                name="fontanero_id"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel htmlFor="fontanero_id">Fontanero</FormLabel>
                                        <FormControl>
                                            <Select
                                                onValueChange={(value) => field.onChange(value)}
                                                value={field.value}
                                            >
                                                <SelectTrigger className="w-full" id="fontanero_id">
                                                    <SelectValue placeholder="Elige una opción" />
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

                            <FormField
                                control={form.control}
                                name="observacion"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel htmlFor="observacion">Observacion</FormLabel>
                                        <FormControl>
                                            <Input
                                                id="observacion"
                                                placeholder="Observacion"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="numero_servicios"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel htmlFor="numero_servicios">Número de Servicios</FormLabel>
                                        <FormControl>
                                            <Input
                                                id="numero_servicios"
                                                type="number"
                                                placeholder="Número de Servicios"
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
                                name="bomba_distribucion_id"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel htmlFor="bomba_distribucion_id">Bomba de agua</FormLabel>
                                        <FormControl>
                                            <Select
                                                onValueChange={(value) => field.onChange(value)}
                                                value={field.value}
                                            >
                                                <SelectTrigger className="w-full" id="bomba_distribucion_id">
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

                        </div>

                        <div className="flex justify-between">

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
                                                    <SelectValue placeholder="Elige una opción" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="Si">Sí</SelectItem>
                                                    <SelectItem value="No">No</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="drenaje"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel htmlFor="tarifa">Drenaje</FormLabel>
                                        <FormControl>
                                            <Select
                                                onValueChange={(value) => field.onChange(value)}
                                                value={field.value}
                                            >
                                                <SelectTrigger className="w-full" id="drenaje">
                                                    <SelectValue placeholder="Elige una opción" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="Si">Sí</SelectItem>
                                                    <SelectItem value="No">No</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="numero_recibo_drenaje"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel htmlFor="numero_recibo_drenaje">Número de Recibo Drenaje</FormLabel>
                                        <FormControl>
                                            <Input
                                                id="numero_recibo_drenaje"
                                                type="number"
                                                placeholder="Número de Recibo Drenaje"
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
                                name="monto_drenaje"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel htmlFor="monto_drenaje">Monto Drenaje</FormLabel>
                                        <FormControl>
                                            <Input
                                                id="monto_drenaje"
                                                type="number"
                                                placeholder="Monto Drenaje"
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
                                name="levanto_adoquin"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel htmlFor="levanto_adoquin">Levantó Adoquín</FormLabel>
                                        <FormControl>
                                            <Select
                                                onValueChange={(value) => field.onChange(value)}
                                                value={field.value}
                                            >
                                                <SelectTrigger className="w-full" id="levanto_adoquin">
                                                    <SelectValue placeholder="Elige una opción" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="Si">Sí</SelectItem>
                                                    <SelectItem value="No">No</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="numero_recibo_garantia"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel htmlFor="numero_recibo_garantia">Número de Recibo Garantía</FormLabel>
                                        <FormControl>
                                            <Input
                                                id="numero_recibo_garantia"
                                                type="number"
                                                placeholder="Número de Recibo Garantía"
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
                                name="deposito_garantia"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel htmlFor="deposito_garantia">Deposito Garantia</FormLabel>
                                        <FormControl>
                                            <Input
                                                id="deposito_garantia"
                                                placeholder="Deposito Garantia"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="numero_medidor"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel htmlFor="numero_medidor">Numero Medidor</FormLabel>
                                        <FormControl>
                                            <Input
                                                id="numero_medidor"
                                                placeholder="Numero Medidor"
                                                {...field}
                                            />
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
