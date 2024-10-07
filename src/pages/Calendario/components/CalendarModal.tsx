// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import { Button } from "@/components/ui/button";
// import {
//     Dialog,
//     DialogContent,
//     DialogDescription,
//     DialogFooter,
//     DialogHeader,
//     DialogTitle,
// } from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
// import { addHours, addMinutes } from "date-fns";
// import { useState, useEffect } from "react";
// // Esquema de validación con Zod
// const formSchema = z
//     .object({
//         title: z.string().min(2, { message: "El título debe tener al menos 2 caracteres." }),
//         notes: z.string().optional(),
//         start: z.date(),
//         end: z.date(),
//     })
//     .refine((data) => data.end >= data.start, {
//         message: "La fecha de fin no puede ser anterior a la fecha de inicio.",
//         path: ["end"], // Esto apunta el error al campo "end"
//     });

// export function DialogDemo() {
//     const [isOpen, setIsOpen] = useState(false);

//     useEffect(() => {
//         setIsOpen(true);
//     }, []);

//     const form = useForm({
//         resolver: zodResolver(formSchema),
//         defaultValues: {
//             title: "",
//             notes: "",
//             start: new Date(),
//             end: addHours(new Date(), 1), // Establece la fecha de fin una hora después de la fecha de inicio
//         },
//     })

//     const onSubmit = (data) => {
//         console.log(data);
//         // Aquí iría la lógica para guardar el evento

//         // Reinicia el formulario después de enviarlo
//         form.reset({
//             title: "",
//             notes: "",
//             start: new Date(),
//             end: addMinutes(new Date(), 1),
//         });
//     };

//     return (
//         <Dialog open={isOpen} onOpenChange={setIsOpen}>
//             <DialogContent className="sm:max-w-[600px]">
//                 <DialogHeader>
//                     <DialogTitle>Nuevo evento</DialogTitle>
//                     <DialogDescription>
//                         Llena los detalles para crear un nuevo evento. Haz clic en guardar cuando termines.
//                     </DialogDescription>
//                 </DialogHeader>

//                 <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 py-4">
//                     {/* Fecha y hora inicio */}
//                     <div className="grid grid-cols-1 gap-2">
//                         <Label htmlFor="start">Fecha y hora inicio</Label>
//                         <Input
//                             type="datetime-local"
//                             {...form.register("start", { valueAsDate: true })}
//                             className="form-control"
//                         />
//                     </div>

//                     {/* Fecha y hora fin */}
//                     <div className="grid grid-cols-1 gap-2">
//                         <Label htmlFor="end">Fecha y hora fin</Label>
//                         <Input
//                             type="datetime-local"
//                             {...form.register("end", { valueAsDate: true })}
//                             className="form-control"
//                             min={addHours(form.watch("start") || new Date(), 1).toISOString().slice(0, 16)} // Restringe a no ser menor a una hora después de la fecha de inicio
//                         />
//                     </div>

//                     <hr />

//                     {/* Título del evento */}
//                     <div className="grid grid-cols-1 gap-2">
//                         <Label htmlFor="title">Título y notas</Label>
//                         <Input
//                             id="title"
//                             type="text"
//                             placeholder="Título del evento"
//                             {...form.register("title")}
//                             className="form-control"
//                         />
//                         <small className="text-muted">Una descripción corta</small>
//                     </div>

//                     {/* Notas adicionales */}
//                     <div className="grid grid-cols-1 gap-2">
//                         <Label htmlFor="notes">Notas</Label>
//                         <Textarea
//                             id="notes"
//                             placeholder="Notas"
//                             rows={5}
//                             {...form.register("notes")}
//                             className="form-control"
//                         ></Textarea>
//                         <small className="text-muted">Información adicional</small>
//                     </div>

//                     <DialogFooter>
//                         <Button type="submit" className="btn btn-outline-primary btn-block">
//                             <span>Guardar</span>
//                         </Button>
//                     </DialogFooter>
//                 </form>
//             </DialogContent>
//         </Dialog>
//     );
// }

"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

// Esquema de validación con Zod
const formSchema = z
    .object({
        title: z.string().min(2, { message: "El título debe tener al menos 2 caracteres." }),
        notes: z.string().optional(),
        start: z.string().refine((val) => val !== "" && !isNaN(Date.parse(val)), {
            message: "Fecha de inicio inválida.",
        }),
        end: z.string().refine((val) => val !== "" && !isNaN(Date.parse(val)), {
            message: "Fecha de fin inválida.",
        }),
    })
    .refine((data) => new Date(data.end) >= new Date(data.start), {
        message: "La fecha de fin debe ser mayor o igual a la fecha de inicio.",
        path: ["end"], // El error será asignado al campo "end"
    });

export function DialogDemo() {
    const { toast } = useToast();
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        setIsOpen(true);
    }, []);

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            notes: "",
            start: "",
            end: "",
        },
    });

    const onSubmit = (data) => {

        if (form.formState.errors.title || form.formState.errors.start || form.formState.errors.end) {
            toast({
                title: "Error",
                description: "Revisa los campos requeridos y asegúrate de que la fecha de fin sea mayor a la de inicio.",
                variant: "destructive",
            });
        } else {
            toast({
                title: "Éxito",
                description: "Todos los campos están completos, el evento se guardó correctamente.",
                variant: "succes",
            });

            // Lógica para guardar el evento
            console.log(data);

            // Reinicia el formulario después de enviarlo
            form.reset({
                title: "",
                notes: "",
                start: "",
                end: "",
            });
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>Nuevo evento</DialogTitle>
                    <DialogDescription>
                        Llena los detalles para crear un nuevo evento. Haz clic en guardar cuando termines.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 py-4">
                    {/* Fecha y hora inicio */}
                    <div className="grid grid-cols-1 gap-2">
                        <Label htmlFor="start">Fecha y hora inicio</Label>
                        <Input
                            type="datetime-local"
                            {...form.register("start")}
                            className="form-control"
                        />
                        {form.formState.errors.start && (
                            <p className="text-red-500 text-sm">
                                {form.formState.errors.start.message}
                            </p>
                        )}
                    </div>

                    {/* Fecha y hora fin */}
                    <div className="grid grid-cols-1 gap-2">
                        <Label htmlFor="end">Fecha y hora fin</Label>
                        <Input
                            type="datetime-local"
                            {...form.register("end")}
                            className="form-control"
                        />
                        {form.formState.errors.end && (
                            <p className="text-red-500 text-sm">
                                {form.formState.errors.end.message}
                            </p>
                        )}
                    </div>

                    <hr />

                    {/* Título del evento */}
                    <div className="grid grid-cols-1 gap-2">
                        <Label htmlFor="title">Título y notas</Label>
                        <Input
                            id="title"
                            type="text"
                            placeholder="Título del evento"
                            {...form.register("title")}
                            className="form-control"
                        />
                        {form.formState.errors.title && (
                            <p className="text-red-500 text-sm">
                                {form.formState.errors.title.message}
                            </p>
                        )}
                        {/* <small className="text-gray-400 ">Una descripción corta</small> */}
                    </div>

                    {/* Notas adicionales */}
                    <div className="grid grid-cols-1 gap-2">
                        <Label htmlFor="notes">Notas</Label>
                        <Textarea
                            id="notes"
                            placeholder="Notas"
                            rows={5}
                            {...form.register("notes")}
                            className="form-control"
                        ></Textarea>
                    </div>

                    <DialogFooter>
                        <Button type="submit" className="btn btn-outline-primary btn-block">
                            <span>Guardar</span>
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
