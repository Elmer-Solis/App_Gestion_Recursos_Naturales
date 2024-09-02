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

import { Checkbox } from "@/components/ui/checkbox"

import { Input } from "@/components/ui/input";
import { useBombaStore } from '../../store/storeBombas';
import { useToast } from "@/hooks/use-toast";
import { useEffect } from "react";

// Definir el esquema de validación
const formSchema = z.object({
    name: z.string().min(2, {
        message: "El nombre de la Bomba es obligatorio.",
    }).max(20, {
        message: 'El nombre no debe ser mayor a 20 caracteres'
    }),
    direccion: z.string().min(2, {
        message: "La direccion de la Bomba es obligatorio.",
    }).max(30, {
        message: 'La direccion no debe ser mayor a 30 caracteres'
    }),
    bombeo: z.string().min(2, {
        message: "El nombre de la bomba es obligatorio.",
    }),
    zonas: z.array(z.string()).nonempty("Debe seleccionar al menos una zona."),
});

export function BombaForm() {

    const { toast } = useToast()

    const addBomba = useBombaStore(state => state.addBomba)
    const activeId = useBombaStore(state => state.activeId)
    const bombas = useBombaStore(state => state.bombas)
    const updateBomba = useBombaStore(state => state.updateBomba)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            direccion: "",
            bombeo: "",
            zonas: []
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
            const activeBomba = bombas.filter(bomba => bomba.id === activeId)[0]
            form.setValue('name', activeBomba.name)
            form.setValue('direccion', activeBomba.direccion)
            form.setValue('bombeo', activeBomba.bombeo)
            // Verificar si `zonas` tiene al menos un elemento, si no, asignar un array con un valor por defecto
            if (activeBomba.zonas.length > 0) {
                form.setValue('zonas', [activeBomba.zonas[0], ...activeBomba.zonas.slice(1)]);
            } else {
                form.setValue('zonas', ['']);  // Proporcionar un valor predeterminado
            }
        }
    }, [activeId])

    const registerBomba = (data: z.infer<typeof formSchema>) => {

        if (activeId) {
            updateBomba(data)
            toast({
                variant: 'update',
                title: "Actualizacion Exitosa",
                description: "Bomba Actualizado Correctamente ",
            })
        } else {
            addBomba(data)
            toast({
                variant: 'succes',
                title: "Registro Exitoso",
                description: "Bomba Registrado Correctamente ",
            })
        }
        form.reset()
    };

    return (
        <div className="md:w-1/2 lg:w-2/5 mx-5">
            <h2 className="font-black text-3xl text-center">Seguimiento Bombas</h2>

            <p className="text-lg mt-5 text-center mb-10">
                Añade Bombas y {''}
                <span className="  text-blue-500 font-bold">Administralos</span>
            </p>
            <Card>
                <Form {...form} >
                    <form onSubmit={form.handleSubmit(registerBomba)}
                        className=" py-10 px-5 space-y-5 ">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nombre de la Bomba</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Ingresa el nombre de la bomba"
                                            {...field} />
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
                                        <Input placeholder="Ingresa la direccion de la bomba" {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="bombeo"
                            render={({ field }) => (
                                <FormItem>
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
                            name="zonas"
                            render={() => (
                                <FormItem>
                                    <div className="mb-4">
                                        <FormLabel className="text-base">Zonas de distribución</FormLabel>
                                        <FormDescription>
                                            Selecciona las zonas a las que la bomba va a distribuir agua.
                                        </FormDescription>
                                    </div>
                                    {zonasDisponibles.map((zona) => (
                                        <FormField
                                            key={zona.id}
                                            control={form.control}
                                            name="zonas"
                                            render={({ field }) => (
                                                <FormItem
                                                    key={zona.id}
                                                    className="flex flex-row items-start space-x-3 space-y-0"
                                                >
                                                    <FormControl>
                                                        <Checkbox
                                                            checked={field.value?.includes(zona.id)}
                                                            onCheckedChange={(checked) => {
                                                                return checked
                                                                    ? field.onChange([...field.value, zona.id])
                                                                    : field.onChange(
                                                                        field.value?.filter(
                                                                            (value) => value !== zona.id
                                                                        )
                                                                    );
                                                            }}
                                                        />
                                                    </FormControl>
                                                    <FormLabel className="font-normal">
                                                        {zona.label}
                                                    </FormLabel>
                                                </FormItem>
                                            )}
                                        />
                                    ))}
                                    <FormMessage />
                                </FormItem>
                            )}
                        />


                        <Button type="submit"
                            className="uppercase text-white font-bold w-full "
                        >Guardar Bomba</Button>
                    </form>
                </Form>
            </Card>
        </div>
    );
}
