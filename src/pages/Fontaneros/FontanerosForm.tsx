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

import { useFontaneroStore } from '../../store/storeFontanero';
import { useToast } from "@/hooks/use-toast";
import { useEffect } from "react";
import { useBombaStore } from "@/store/storeBombas";


// Definir el esquema de validación
const formSchema = z.object({
    name: z.string().min(2, {
        message: "El nombre del fontanero es obligatorio.",
    }).max(20, {
        message: 'El nombre no debe ser mayor a 20 caracteres'
    }),
    phone: z
        .string()
        .regex(/^[0-9]{8}$/, "Número de teléfono no válido"),
    bomba: z.string().min(1, {
        message: "Debes seleccionar una bomba de agua.",
    }),
    renglon: z.string().min(2, {
        message: "El renglon del fontanero es obligatorio.",
    })
});

export function FontanerosForm() {

    const { toast } = useToast();

    const addFontanero = useFontaneroStore(state => state.addFontanero);
    const activeId = useFontaneroStore(state => state.activeId);
    const fontaneros = useFontaneroStore(state => state.fontaneros);
    const updateFontanero = useFontaneroStore(state => state.updateFontanero);

    const fetchBombas = useBombaStore(state => state.fetchBombas);
    const bombas = useBombaStore(state => state.bombas);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            phone: "",
            bomba: "",
            renglon: ""
        },
        mode: "onChange",
    });

    useEffect(() => {
        // Cargar bombas al montar el componente
        fetchBombas();
    }, [fetchBombas]);

    useEffect(() => {
        if (activeId) {
            const activeFontanero = fontaneros.find(fontanero => fontanero.id === activeId);
            if (activeFontanero) {
                form.setValue('name', activeFontanero.name);
                form.setValue('phone', activeFontanero.phone);
                form.setValue('bomba', activeFontanero.bomba);
                form.setValue('renglon', activeFontanero.renglon);
            }
        }
    }, [activeId, fontaneros, form]);

    const registerFontanero = (data: z.infer<typeof formSchema>) => {
        if (activeId) {
            updateFontanero(data);
            toast({
                variant: 'update',
                title: "Actualización Exitosa",
                description: "Fontanero Actualizado Correctamente",
            });
        } else {
            addFontanero(data);
            toast({
                variant: 'succes',
                title: "Registro Exitoso",
                description: "Fontanero Registrado Correctamente",
            });
        }
        form.reset();
    };

    return (
        <div className="md:w-1/2 lg:w-2/5 mx-5">
            <h2 className="font-black text-3xl text-center">Seguimiento Fontaneros</h2>
            <p className="text-lg mt-5 text-center mb-10">
                Añade Fontaneros y {''}
                <span className="text-blue-500 font-bold">Administralos</span>
            </p>
            <Card >
                <Form {...form}  >
                    <form onSubmit={form.handleSubmit(registerFontanero)}
                        className="py-6 px-5 md:px-8 space-y-5">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nombre Completo</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Nombre del Fontanero" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Teléfono</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Número de Teléfono" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Select para Bombas */}

                        <FormField
                            control={form.control}
                            name="renglon"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel htmlFor="renglon">Tarifa</FormLabel>
                                    <FormControl>
                                        <Select
                                            onValueChange={(value) => field.onChange(value)}
                                            value={field.value}
                                        >
                                            <SelectTrigger className="w-full" id="renglon">
                                                <SelectValue placeholder="Elije la opcion" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="contrato">Contrato</SelectItem>
                                                <SelectItem value="presupuestado">Presupuestado</SelectItem>
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
                                    <FormLabel>Bomba de agua</FormLabel>
                                    <FormControl>
                                        <Select
                                            onValueChange={(value) => field.onChange(value)}
                                            value={field.value}
                                        >
                                            <SelectTrigger className="w-full">
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

                        <Button type="submit" className="uppercase text-white font-bold w-full">
                            Guardar Fontanero
                        </Button>
                    </form>
                </Form>
            </Card>
        </div>
    );
}
