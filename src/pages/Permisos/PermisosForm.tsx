import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Card } from "@/components/ui/card";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"; import { Button } from "@/components/ui/button";


import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { usePermisoStore } from "@/store/storePermisos";
import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
    email: z.string()
        .email({ message: "El correo debe ser válido." }),  // Obligatorio
    role: z.string()
        .min(2, { message: "El nombre es obligatorio." })
});


export function PermisosForm() {
    const { toast } = useToast();

    const { addPermiso, updatePermiso, activePermisosId,
        permisos, setActivePermisoId } = usePermisoStore();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            role: "",
        },
        mode: "onChange",
    });

    useEffect(() => {
        if (activePermisosId) {
            const activePermiso = permisos.find(permiso => permiso.id === activePermisosId);
            if (activePermiso) {
                form.setValue("email", activePermiso.email);
                form.setValue("role", activePermiso.role);
            }
        }
    }, [activePermisosId, permisos, form]);

    const registerPermiso = async (data: z.infer<typeof formSchema>) => {
        const solicitudData = {
            email: data.email,
            role: data.role,
        };

        if (activePermisosId) {
            await updatePermiso(solicitudData);
            toast({
                variant: 'update',
                title: "Actualización Exitosa",
                description: "Solicitud Actualizada Correctamente",
            });
            setActivePermisoId(""); // Limpiar el ID activo después de la actualización;
        } else {
            await addPermiso(solicitudData);
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
            <h2 className="font-black text-3xl text-center">Seguimiento de Usuarios</h2>
            <p className="text-lg mt-5 text-center mb-10">
                Añade Usuarios y {''}
                <span className="text-blue-500 font-bold">Administralos</span>
            </p>
            <Card>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(registerPermiso)}
                        className="py-6 px-5 md:px-8 space-y-5">

                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel htmlFor="email">Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            id="email"
                                            placeholder="Ingresa Email"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="role"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel htmlFor="role">Roles</FormLabel>
                                    <FormControl>
                                        <Select
                                            onValueChange={(value) => field.onChange(value)}
                                            value={field.value}
                                        >
                                            <SelectTrigger className="w-full" id="role">
                                                <SelectValue placeholder="Selecciona un rol" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Superadmin">Superadmin</SelectItem>
                                                <SelectItem value="Admin">Admin</SelectItem>
                                                <SelectItem value="Fontanero">Fontanero</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button type="submit" className="uppercase text-white font-bold w-full">
                            Guardar Usuario
                        </Button>
                    </form>
                </Form>
            </Card>
        </div>
    )
}
