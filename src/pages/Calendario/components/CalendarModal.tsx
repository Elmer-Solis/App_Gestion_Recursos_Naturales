// import { useEffect, useState } from "react";
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
// import { Textarea } from "@/components/ui/textarea"; // Componente para el textarea
// import { addHours } from "date-fns";

// import { Calendar } from "@/components/ui/calendar"
// import { CalendarForm } from "./DatePicker";

// export function DialogDemo() {
//     const [isOpen, setIsOpen] = useState(false);

//     useEffect(() => {
//         // Abre el modal automáticamente cuando el componente se monta
//         setIsOpen(true);
//     }, []);

//     const [formValues, setFormValues] = useState({
//         title: 'Fernando',
//         notes: 'Herrera',
//         start: new Date(),
//         end: addHours(new Date(), 2),
//     });

//     const onInputChange = ({ target }) => {
//         setFormValues({
//             ...formValues,
//             [target.name]: target.value
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

//                 <form className="grid gap-4 py-4">
//                     {/* Fecha y hora inicio */}
//                     <div className="grid grid-cols-1 gap-2">
//                         <Label htmlFor="start">Fecha y hora inicio</Label>

//                     </div>

//                     {/* Fecha y hora fin */}
//                     <div className="grid grid-cols-1 gap-2">
//                         <Label htmlFor="end">Fecha y hora fin</Label>

//                     </div>

//                     <hr />

//                     {/* Título del evento */}
//                     <div className="grid grid-cols-1 gap-2">
//                         <Label htmlFor="title">Título y notas</Label>
//                         <Input
//                             id="title"
//                             type="text"
//                             placeholder="Título del evento"
//                             name="title"
//                             autoComplete="off"
//                             className="form-control"
//                             value={formValues.title}
//                             onChange={onInputChange}
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
//                             name="notes"
//                             className="form-control"
//                             value={formValues.notes}
//                             onChange={onInputChange}
//                         ></Textarea>
//                         <small className="text-muted">Información adicional</small>
//                     </div>

//                     <DialogFooter>
//                         <Button type="submit" className="btn btn-outline-primary btn-block">
//                             <i className="far fa-save"></i>
//                             <span> Guardar</span>
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
import { addHours } from "date-fns";
import { useState, useEffect } from "react";
// Esquema de validación con Zod
const formSchema = z
    .object({
        title: z.string().min(2, { message: "El título debe tener al menos 2 caracteres." }),
        notes: z.string().optional(),
        start: z.date(),
        end: z.date(),
    })
    .refine((data) => data.end >= data.start, {
        message: "La fecha de fin no puede ser anterior a la fecha de inicio.",
        path: ["end"], // Esto apunta el error al campo "end"
    });

export function DialogDemo() {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        setIsOpen(true);
    }, []);

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "Fernando",
            notes: "Herrera",
            start: new Date(),
            end: addHours(new Date(), 2),
        },
    });

    const onSubmit = (data) => {
        console.log(data);
        // Aquí iría la lógica para guardar el evento
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
                            {...form.register("start", { valueAsDate: true })}
                            className="form-control"
                        />
                    </div>

                    {/* Fecha y hora fin */}
                    <div className="grid grid-cols-1 gap-2">
                        <Label htmlFor="end">Fecha y hora fin</Label>
                        <Input
                            type="datetime-local"
                            {...form.register("end", { valueAsDate: true })}
                            className="form-control"
                            min={form.watch("start")?.toISOString().slice(0, 16)} // Restringe a no ser menor a la fecha de inicio
                        />
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
                        <small className="text-muted">Una descripción corta</small>
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
                        <small className="text-muted">Información adicional</small>
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
