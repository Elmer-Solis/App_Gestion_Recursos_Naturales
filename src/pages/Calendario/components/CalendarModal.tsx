
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

//     const { addEvent } = useCalendarStore()
//     const { isDateModalOpen, closeDateModal } = useUiStore();
//     const { toast } = useToast();

//     const form = useForm({
//         resolver: zodResolver(formSchema),
//         defaultValues: {
//             title: "",
//             notes: "",
//             start: "",
//             end: "",
//         },
//     });


//     const onSubmit = (data) => {

//         if (form.formState.errors.title || form.formState.errors.start || form.formState.errors.end) {
//             toast({
//                 title: "Error",
//                 description: "Revisa los campos requeridos y asegúrate de que la fecha de fin sea mayor a la de inicio.",
//                 variant: "destructive",
//             });
//         } else {
//             // Convertimos las fechas de inicio y fin a objetos Date
//             const newEvent = {
//                 id: Date.now(), // Puedes usar Date.now() para generar un id temporal
//                 title: data.title,
//                 notes: data.notes,
//                 start: new Date(data.start),
//                 end: new Date(data.end),
//             };

//             // Agregamos el evento al store
//             addEvent(newEvent);

//             toast({
//                 title: "Éxito",
//                 description: "El evento se guardó correctamente.",
//                 variant: "succes",
//             });

//             form.reset({
//                 title: "",
//                 notes: "",
//                 start: "",
//                 end: "",
//             });

//             closeDateModal();
//         }
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
//                             id="start" // Asegurarse de que el id coincida con htmlFor
//                             type="datetime-local"
//                             {...form.register("start")}
//                             className="form-control custom-datetime-input "
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
//                             id="end" // Asegurarse de que el id coincida con htmlFor
//                             type="datetime-local"
//                             {...form.register("end")}
//                             className="form-control custom-datetime-input "
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
//                             id="title" // Asegurarse de que el id coincida con htmlFor
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
//                             id="notes" // Asegurarse de que el id coincida con htmlFor
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
        path: ["end"],
    });

export function DialogDemo() {

    const { addEvent } = useCalendarStore()
    const { isDateModalOpen, closeDateModal } = useUiStore();
    const { toast } = useToast();

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
            // Convertimos las fechas de inicio y fin a objetos Date
            const newEvent = {
                id: uuidv4(), // Generar un ID único usando uuid
                title: data.title,
                notes: data.notes,
                start: new Date(data.start),
                end: new Date(data.end),
            };

            // Agregamos el evento al store
            addEvent(newEvent);

            toast({
                title: "Éxito",
                description: "El evento se guardó correctamente.",
                variant: "succes",
            });

            form.reset({
                title: "",
                notes: "",
                start: "",
                end: "",
            });

            closeDateModal();
        }
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
