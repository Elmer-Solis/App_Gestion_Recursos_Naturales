// import { v4 as uuidv4 } from "uuid";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import { Button } from "@/components/ui/button";
// import {
//     Dialog,
//     DialogContent,
//     DialogFooter,
//     DialogTitle,
//     DialogDescription
// } from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
// import { useToast } from "@/hooks/use-toast";
// import { useUiStore } from "@/store/storeModalCalendario";
// import '../../../styles.css';
// import { useCalendarStore } from "@/store/storeCalendario";
// import { useEffect } from "react";

// type FormData = z.infer<typeof formSchema>;


// // Esquema de validación con Zod
// const formSchema = z
//     .object({
//         title: z.string().min(2, { message: "El título debe tener al menos 2 caracteres." }),
//         notes: z.string().optional(),
//         start: z.string().refine((val) => val !== "" && !isNaN(Date.parse(val)), {
//             message: "Fecha de inicio inválida.",
//         }),
//         end: z.string().refine((val) => val !== "" && !isNaN(Date.parse(val)), {
//             message: "Fecha de fin inválida.",
//         }),
//     })
//     .refine((data) => new Date(data.end) >= new Date(data.start), {
//         message: "La fecha de fin debe ser mayor o igual a la fecha de inicio.",
//         path: ["end"],
//     });

// export function DialogDemo() {

//     const { addEvent, selectedEvent, updateEvent, setSelectedEvent } = useCalendarStore()
//     const { isDateModalOpen, closeDateModal } = useUiStore();
//     const { toast } = useToast();

//     const form = useForm({
//         resolver: zodResolver(formSchema),
//         defaultValues: selectedEvent
//             ? {
//                 title: selectedEvent.title,
//                 notes: selectedEvent.notes || "",
//                 start: selectedEvent.start.toISOString().slice(0, 16),
//                 end: selectedEvent.end.toISOString().slice(0, 16),
//             }
//             : {
//                 title: "",
//                 notes: "",
//                 start: "",
//                 end: "",
//             },
//     })

//     useEffect(() => {
//         if (selectedEvent) {
//             // Si hay un evento seleccionado, llena el formulario con sus datos
//             form.reset({
//                 title: selectedEvent.title,
//                 notes: selectedEvent.notes || "",
//                 start: formatDateTimeLocal(selectedEvent.start),
//                 end: formatDateTimeLocal(selectedEvent.end),
//             });
//         } else {
//             // Si no hay evento seleccionado, limpia el formulario
//             form.reset({
//                 title: "",
//                 notes: "",
//                 start: "",
//                 end: "",
//             });
//         }
//     }, [selectedEvent, form]);

//     function formatDateTimeLocal(date: Date) {
//         const year = date.getFullYear();
//         const month = String(date.getMonth() + 1).padStart(2, "0");
//         const day = String(date.getDate()).padStart(2, "0");
//         const hours = String(date.getHours()).padStart(2, "0");
//         const minutes = String(date.getMinutes()).padStart(2, "0");
//         return `${year}-${month}-${day}T${hours}:${minutes}`;
//     }

//     const onSubmit = (data: FormData) => {
//         const newEvent = {
//             id: selectedEvent ? selectedEvent.id : uuidv4(),
//             title: data.title,
//             notes: data.notes,
//             start: new Date(data.start),
//             end: new Date(data.end),
//         };

//         if (selectedEvent) {
//             updateEvent(newEvent);
//             toast({
//                 title: "Evento actualizado",
//                 variant: 'update',
//                 description: "El evento fue editado correctamente."
//             });
//         } else {
//             addEvent(newEvent);
//             toast({
//                 title: "Evento creado",
//                 variant: 'succes',
//                 description: "El evento fue creado correctamente."
//             });
//         }

//         setSelectedEvent(null); // Limpiar el evento seleccionado después de guardar
//         form.reset();
//         closeDateModal();
//     };

//     return (
//         <Dialog open={isDateModalOpen} onOpenChange={(open) => {
//             if (!open) closeDateModal();
//         }}>
//             <DialogContent className="sm:max-w-[600px]">
//                 {/* Título del diálogo */}
//                 <DialogTitle>
//                     Crear Evento
//                 </DialogTitle>

//                 {/* Descripción del diálogo */}
//                 <DialogDescription>
//                     Completa el formulario para agregar un nuevo evento.
//                 </DialogDescription>

//                 <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 py-4">
//                     {/* Fecha y hora inicio */}
//                     <div className="grid grid-cols-1 gap-2">
//                         <Label htmlFor="start">Fecha y hora inicio</Label>
//                         <Input
//                             id="start"
//                             type="datetime-local"
//                             {...form.register("start")}
//                             className="form-control custom-datetime-input"
//                         />
//                         {form.formState.errors.start && (
//                             <p className="text-red-500 text-sm">
//                                 {form.formState.errors.start.message}
//                             </p>
//                         )}
//                     </div>

//                     {/* Fecha y hora fin */}
//                     <div className="grid grid-cols-1 gap-2">
//                         <Label htmlFor="end">Fecha y hora fin</Label>
//                         <Input
//                             id="end"
//                             type="datetime-local"
//                             {...form.register("end")}
//                             className="form-control custom-datetime-input"
//                         />
//                         {form.formState.errors.end && (
//                             <p className="text-red-500 text-sm">
//                                 {form.formState.errors.end.message}
//                             </p>
//                         )}
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
//                         {form.formState.errors.title && (
//                             <p className="text-red-500 text-sm">
//                                 {form.formState.errors.title.message}
//                             </p>
//                         )}
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

import { v4 as uuidv4 } from "uuid";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogTitle,
    DialogDescription
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useUiStore } from "@/store/storeModalCalendario";
import '../../../styles.css';
import { useCalendarStore } from "@/store/storeCalendario";
import { useEffect } from "react";
// import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";

type FormData = z.infer<typeof formSchema>;

// Esquema de validación con Zod
const formSchema = z
    .object({
        title: z.string().min(2, { message: "El título debe tener al menos 2 caracteres." }),
        notes: z.string().optional(),
        horasExtras: z
            .preprocess((val) => val === '' ? 0 : Number(val), z.number({ invalid_type_error: "Debe ser un número." }))
            // .nonnegative("Debe ser un número positivo")
            .optional(),
        start: z.string().refine((val) => val !== "" && !isNaN(Date.parse(val)), {
            message: "Fecha de inicio inválida.",
        }),
        end: z.string().refine((val) => val !== "" && !isNaN(Date.parse(val)), {
            message: "Fecha de fin inválida.",
        }),
        zonas: z.array(z.string()).min(1, { message: "Debe seleccionar al menos una zona." }),
    })
    .refine((data) => new Date(data.end) >= new Date(data.start), {
        message: "La fecha de fin debe ser mayor o igual a la fecha de inicio.",
        path: ["end"],
    });

// Zonas disponibles para selección
const zonasDisponibles = [
    { id: 'zona-1', name: 'Zona 1' },
    { id: 'zona-2', name: 'Zona 2' },
    { id: 'zona-3', name: 'Zona 3' },
    { id: 'zona-4', name: 'Zona 4' },
    { id: 'santa-rita', name: 'santa rita' },
];

export function DialogDemo() {

    const { addEvent, selectedEvent, updateEvent, setSelectedEvent } = useCalendarStore()
    const { isDateModalOpen, closeDateModal } = useUiStore();
    const { toast } = useToast();

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: selectedEvent
            ? {
                title: selectedEvent.title,
                notes: selectedEvent.notes || "",
                start: selectedEvent.start.toISOString().slice(0, 16),
                end: selectedEvent.end.toISOString().slice(0, 16),
                horasExtras: selectedEvent.horasExtras || 0,
                zonas: selectedEvent.zonas || [],  // Zonas seleccionadas por defecto
            }
            : {
                title: "",
                notes: "",
                start: "",
                end: "",
                horasExtras: 0,
                zonas: [],  // Ninguna zona seleccionada por defecto
            },
    })

    useEffect(() => {
        if (selectedEvent) {
            // Si hay un evento seleccionado, llena el formulario con sus datos
            form.reset({
                title: selectedEvent.title,
                notes: selectedEvent.notes || "",
                start: formatDateTimeLocal(selectedEvent.start),
                end: formatDateTimeLocal(selectedEvent.end),
                horasExtras: selectedEvent.horasExtras || 0,
                zonas: selectedEvent.zonas || [],
            });

        } else {
            // Si no hay evento seleccionado, limpia el formulario
            form.reset({
                title: "",
                notes: "",
                start: "",
                end: "",
                horasExtras: 0,
                zonas: [],
            });
        }
    }, [selectedEvent, form]);

    function formatDateTimeLocal(date: Date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        const hours = String(date.getHours()).padStart(2, "0");
        const minutes = String(date.getMinutes()).padStart(2, "0");
        return `${year}-${month}-${day}T${hours}:${minutes}`;
    }

    const onSubmit = (data: FormData) => {
        const newEvent = {
            id: selectedEvent ? selectedEvent.id : uuidv4(),
            title: data.title,
            notes: data.notes,
            start: new Date(data.start),
            end: new Date(data.end),
            horasExtras: data.horasExtras,
            zonas: data.zonas,  // Guardar zonas seleccionadas
        };

        if (selectedEvent) {
            updateEvent(newEvent);
            toast({
                title: "Evento actualizado",
                variant: 'update',
                description: "El evento fue editado correctamente."
            });
        } else {
            addEvent(newEvent);
            toast({
                title: "Evento creado",
                variant: 'succes',
                description: "El evento fue creado correctamente."
            });
        }

        setSelectedEvent(null); // Limpiar el evento seleccionado después de guardar
        form.reset();
        closeDateModal();
    };

    return (
        <Dialog open={isDateModalOpen} onOpenChange={(open) => {
            if (!open) closeDateModal();
        }}>
            <DialogContent className="sm:max-w-[600px]">
                {/* Título del diálogo */}
                <DialogTitle>
                    Crear Evento
                </DialogTitle>

                {/* Descripción del diálogo */}
                <DialogDescription>
                    Completa el formulario para agregar un nuevo evento.
                </DialogDescription>

                <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 py-4">
                    {/* Fecha y hora inicio */}
                    <div className="grid grid-cols-2 gap-4">
                        {/* Fecha y hora inicio */}
                        <div className="grid grid-cols-1 gap-2">
                            <Label htmlFor="start">Fecha y hora inicio</Label>
                            <Input
                                id="start"
                                type="datetime-local"
                                {...form.register("start")}
                                className="form-control custom-datetime-input"
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
                                id="end"
                                type="datetime-local"
                                {...form.register("end")}
                                className="form-control custom-datetime-input"
                            />
                            {form.formState.errors.end && (
                                <p className="text-red-500 text-sm">
                                    {form.formState.errors.end.message}
                                </p>
                            )}
                        </div>
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

                    {/* Horas Extras   */}
                    <div className="grid grid-cols-1 gap-2">
                        <Label htmlFor="horasExtras">Horas Extras</Label>
                        <Input
                            id="horasExtras"
                            type="number"
                            {...form.register("horasExtras")}
                            className="form-control"
                        />
                        {form.formState.errors.horasExtras && (
                            <p className="text-red-500 text-sm">
                                {form.formState.errors.horasExtras.message}
                            </p>
                        )}
                    </div>


                    {/* Zonas */}
                    <div className="grid grid-cols-1 gap-2">
                        <Label htmlFor="zonas">Zonas</Label>
                        {zonasDisponibles.map((zona) => (
                            <div key={zona.id} className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    id={zona.id}
                                    value={zona.id}
                                    {...form.register("zonas")}
                                />
                                <Label htmlFor={zona.id}>{zona.name}</Label>
                            </div>
                        ))}
                        {form.formState.errors.zonas && (
                            <p className="text-red-500 text-sm">{form.formState.errors.zonas.message}</p>
                        )}
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

