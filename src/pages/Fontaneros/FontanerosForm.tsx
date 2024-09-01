import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// Importar los componentes de UI (ajusta los paths según tu proyecto)
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
import { Input } from "@/components/ui/input";
import { useFontaneroStore } from '../../store/storeFontanero';
import { useToast } from "@/hooks/use-toast";
import { useEffect } from "react";


// Definir el esquema de validación
const formSchema = z.object({
    name: z.string().min(2, {
        message: "El nombre del fontanero es obligatorio.",
    }),
    phone: z
        .string()
        .regex(/^[0-9]{8}$/, "Número de teléfono no válido"),
    // .min(8, "El teléfono debe tener al menos 8 dígitos")
    // .max(8, "El teléfono no debe tener más de 8 dígitos"),

    bomba: z.string().min(2, {
        message: "El nombre de la bomba es obligatorio.",
    }),
});

// Crear el componente del formulario
export function FontanerosForm() {




    const { toast } = useToast()



    const addFontanero = useFontaneroStore(state => state.addFontanero)
    const activeId = useFontaneroStore(state => state.activeId)
    const fontaneros = useFontaneroStore(state => state.fontaneros)
    const updateFontanero = useFontaneroStore(state => state.updateFontanero)


    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            phone: "",
            bomba: ""
        },

        mode: "onChange",
    });


    useEffect(() => {

        if (activeId) {
            const activeFontanero = fontaneros.filter(fontanero => fontanero.id === activeId)[0]
            form.setValue('name', activeFontanero.name)
            form.setValue('phone', activeFontanero.phone)
            form.setValue('bomba', activeFontanero.bomba)
        }

    }, [activeId])


    const registerFontanero = (data: z.infer<typeof formSchema>) => {

        if (activeId) {
            updateFontanero(data)

            toast({
                variant: 'update',
                title: "Actualizacion Exitosa",
                description: "Fontanero Actualizado Correctamente ",
            })

        } else {
            addFontanero(data)
            toast({
                variant: 'succes',
                title: "Registro Exitoso",
                description: "Fontanero Registrado Correctamente ",
            })
        }
        form.reset()
    };


    return (
        <div className="md:w-1/2 lg:w-2/5 mx-5">
            <h2 className="font-black text-3xl text-center">Seguimiento Fontaneros</h2>

            <p className="text-lg mt-5 text-center mb-10">
                Añade Fontaneros y {''}
                <span className="  text-blue-500 font-bold">Administralos</span>
            </p>
            <Card>
                <Form {...form} >
                    <form onSubmit={form.handleSubmit(registerFontanero)}
                        className=" py-10 px-5 space-y-5 ">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nombre Completo</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Nombre del Fontanero"
                                            {...field} />
                                    </FormControl>
                                    {/* <FormDescription>Nombre completo del paciente.</FormDescription> */}
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
                                        <Input placeholder="Número de Teléfono" {...field}
                                        />
                                    </FormControl>
                                    {/* <FormDescription>Tu número de contacto.</FormDescription> */}
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
                                        <Input placeholder="Ingrese nombre de bomba" {...field} />
                                    </FormControl>
                                    {/* <FormDescription>Tu número de contacto.</FormDescription> */}
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button type="submit"
                            className="uppercase text-white font-bold w-full "
                        >Guardar Fontanero</Button>
                    </form>
                </Form>
            </Card>
        </div>
    );
}
