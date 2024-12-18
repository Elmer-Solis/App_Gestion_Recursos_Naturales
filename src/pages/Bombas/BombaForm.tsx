import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { useBombaStore } from "../../store/storeBombas";
import { useToast } from "@/hooks/use-toast";
import { useEffect } from "react";

// Definir el esquema de validación
const formSchema = z.object({
    name: z
        .string()
        .min(2, { message: "El nombre de la Bomba es obligatorio." })
        .max(20, { message: "El nombre no debe ser mayor a 20 caracteres" }),
    direccion: z
        .string()
        .min(2, { message: "La direccion de la Bomba es obligatoria." })
        .max(30, { message: "La direccion no debe ser mayor a 30 caracteres" }),
    bombeo: z.string().min(2, { message: "El nombre de la bomba es obligatorio." }),
    zonas: z.array(z.string()).nonempty("Debe seleccionar al menos una zona."),
    nis: z
        .string()
        .min(2, { message: "El nis de la Bomba es obligatorio." })
});

export function BombaForm() {
    const { toast } = useToast();

    const addBomba = useBombaStore((state) => state.addBomba);
    const activeId = useBombaStore((state) => state.activeId);
    const bombas = useBombaStore((state) => state.bombas);
    const updateBomba = useBombaStore((state) => state.updateBomba);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            direccion: "",
            bombeo: "",
            zonas: [],
            nis: "",
        },
        mode: "onChange",
    });

    const zonasDisponibles = [
        { id: "zona1", label: "Zona 1" },
        { id: "zona2", label: "Zona 2" },
        { id: "zona3", label: "Zona 3" },
        { id: "zona4", label: "Zona 4" },
        { id: "santarita", label: "Santa Rita" },
    ] as const;

    useEffect(() => {
        if (activeId) {
            const activeBomba = bombas.find(bomba => bomba.id === activeId);
            if (activeBomba) {
                form.setValue('name', activeBomba.name);
                form.setValue('direccion', activeBomba.direccion);
                form.setValue('bombeo', activeBomba.bombeo);
                form.setValue('nis', activeBomba.nis);
                // Si `zonas` no tiene al menos un valor, proporciona uno predeterminado
                if (activeBomba.zonas.length > 0) {
                    form.setValue('zonas', activeBomba.zonas as [string, ...string[]]); // Forzar a tupla
                } else {
                    form.setValue('zonas', ['zona_predeterminada'] as [string, ...string[]]); // Asegurar al menos un elemento
                }
            }
        }
    }, [activeId]);

    // Hacer que la función sea asíncrona para manejar la inserción o actualización
    const registerBomba = async (data: z.infer<typeof formSchema>) => {
        try {
            if (activeId) {
                await updateBomba(data);
                toast({
                    variant: "update",
                    title: "Actualización Exitosa",
                    description: "Bomba actualizada correctamente.",
                });
            } else {
                await addBomba(data);
                toast({
                    variant: "succes",
                    title: "Registro Exitoso",
                    description: "Bomba registrada correctamente.",
                });
            }
            form.reset();
        } catch (error) {
            console.error("Error al registrar la bomba:", error);
        }
    };

    return (
        <div className="md:w-1/2 lg:w-2/5 mx-5">
            <h2 className="font-black text-3xl text-center">Seguimiento Bombas</h2>

            <p className="text-lg mt-5 text-center mb-10">
                Añade Bombas y {''}
                <span className="text-blue-500 font-bold">Administralos</span>
            </p>
            <Card>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(registerBomba)}
                        className="py-6 px-5 md:px-8 space-y-5">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nombre de la Bomba</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Ingresa el nombre de la bomba" {...field} />
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
                                    <FormLabel>Direccion</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Ingresa la direccion de la bomba" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="flex flex-col md:flex-row md:space-x-4 gap-y-4 md:gap-y-0">
                            <FormField
                                control={form.control}
                                name="bombeo"
                                render={({ field }) => (
                                    <FormItem className="flex-1">
                                        <FormLabel>Capacidad de Bombeo</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Ingresa la capacidad de bombeo" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="nis"
                                render={({ field }) => (
                                    <FormItem className="flex-1">
                                        <FormLabel>Nis</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Ingresa nis de la bomba" {...field} />
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
                                        <FormLabel className="text-base">Zonas de distribución</FormLabel>
                                        <FormDescription>
                                            Selecciona las zonas de la bomba.
                                        </FormDescription>
                                    </div>
                                    {/* Contenedor flex responsivo */}
                                    <div className="grid grid-cols-2 "> {/* Cambia la disposición en pantallas pequeñas y grandes */}
                                        {zonasDisponibles.map((zona) => (
                                            <FormField
                                                key={zona.id}
                                                control={form.control}
                                                name="zonas"
                                                render={({ field }) => (
                                                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 mb-4 md:w-1/5 lg:w-full"> {/* Ajusta el ancho y el espaciado */}
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
                                                        <FormLabel className="font-normal">{zona.label}</FormLabel>
                                                    </FormItem>
                                                )}
                                            />
                                        ))}
                                    </div>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />



                        <Button type="submit" className="uppercase text-white font-bold w-full">
                            Guardar Bomba
                        </Button>
                    </form>
                </Form>
            </Card>
        </div>
    );
}
