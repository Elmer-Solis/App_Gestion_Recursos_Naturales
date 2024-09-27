// import { create } from "zustand";
// import { devtools } from "zustand/middleware";
// import { Bomba, DraftBomba } from '../types/index';
// import { v4 as uuidv4 } from 'uuid'
// import supabase from "@/supabase/supabase.config";

// type Row = {
//     capacidad_bombeo: string;
//     direccion: string;
//     id: number;
//     nombre_bomba: string;
//     zona_distribucion: string;
// };

// type bombaState = {
//     bombas: Bomba[]
//     activeId: Bomba['id']
//     addBomba: (data: DraftBomba) => void
//     deleteBomba: (id: Bomba['id']) => void
//     getBombaById: (id: Bomba['id']) => void //para editar
//     updateBomba: (data: DraftBomba) => void //para editar
//     fetchBombas: () => Promise<void>; // para obtener bombas de supabase
// }

// // Función para mapear de Row (Supabase) a Bomba (local)
// const mapRowToBomba = (row: Row): Bomba => ({
//     id: row.id.toString(), // Convertimos id de number a string
//     name: row.nombre_bomba, // Mapeamos nombre_bomba a name
//     direccion: row.direccion,
//     bombeo: row.capacidad_bombeo, // Mapeamos capacidad_bombeo a bombeo
//     zonas: row.zona_distribucion.split(',') // Suponemos que zona_distribucion es un string separado por comas
// });

// const createBomba = (bomba: DraftBomba): Bomba => {
//     return { ...bomba, id: uuidv4() };
// };

// export const useBombaStore = create<bombaState>()(
//     devtools(

//         (set) => ({
//             bombas: [],

//             activeId: '',

//             // Fetch bombas from Supabase and map them to Bomba type
//             fetchBombas: async () => {
//                 const { data, error } = await supabase.from('bombas').select('*');
//                 if (error) {
//                     console.error('Error obteniendo bombas', error.message);
//                     throw error;
//                 }

//                 // console.log("Datos recibidos de Supabase:", data); // Verifica la estructura aquí
//                 if (data) {
//                     const bombasMapped = (data as Row[]).map(mapRowToBomba);
//                     set({ bombas: bombasMapped });
//                     // console.log("Estado de bombas después de set:", bombasMapped);
//                 }
//             },
//             // Add a new bomba to both the local state and Supabase
//             addBomba: async (data: DraftBomba) => {
//                 const newBomba = { ...data, id: uuidv4() }; // Creamos un ID único para la nueva bomba

//                 const { error } = await supabase.from('bombas').insert([{
//                     nombre_bomba: newBomba.name,
//                     direccion: newBomba.direccion,
//                     capacidad_bombeo: newBomba.bombeo,
//                     zona_distribucion: newBomba.zonas.join(',') // Unimos las zonas en una string separada por comas
//                 }]);

//                 if (error) {
//                     console.error('Error agregando bomba a Supabase', error.message);
//                     throw error;
//                 }

//                 // Actualizamos el estado local
//                 set((state) => ({
//                     bombas: [...state.bombas, newBomba]
//                 }));
//             },
//             // addBomba: (data) => {
//             //     const newFontanero = createBomba(data)
//             //     set((state) => ({
//             //         bombas: [...state.bombas, newFontanero]
//             //     }))
//             // },

//             deleteBomba: (id) => {
//                 set((state) => ({
//                     bombas: state.bombas.filter(bomba => bomba.id !== id)
//                 }))
//             },

//             getBombaById: (id) => {
//                 set(() => ({
//                     activeId: id
//                 }))
//             },

//             // updateBomba: (data) => {
//             //     set((state) => ({
//             //         bombas: state.bombas.map(bomba => bomba.id === state.activeId ?
//             //             { id: state.activeId, ...data } : bomba),
//             //         activeId: ''
//             //     }))
//             // }

//             // Update bomba both locally and in Supabase

//             updateBomba: async (data: DraftBomba) => {
//                 const { activeId, bombas } = get();
//                 const updatedBomba = { id: activeId, ...data };

//                 const { error } = await supabase.from('bombas').update({
//                     nombre_bomba: updatedBomba.name,
//                     direccion: updatedBomba.direccion,
//                     capacidad_bombeo: updatedBomba.bombeo,
//                     zona_distribucion: updatedBomba.zonas.join(',')
//                 }).eq('id', parseInt(activeId)); // Convertimos a número si es necesario

//                 if (error) {
//                     console.error('Error actualizando bomba en Supabase', error.message);
//                     throw error;
//                 }

//                 set((state) => ({
//                     bombas: state.bombas.map(bomba =>
//                         bomba.id === activeId ? updatedBomba : bomba
//                     ),
//                     activeId: ''
//                 }));
//             }
//         })
//     ))

import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { Bomba, DraftBomba } from '../types/index';
import supabase from "@/supabase/supabase.config";
import { v4 as uuidv4 } from 'uuid'
// Tipo de Row de Supabase
type Row = {
    capacidad_bombeo: string;
    direccion: string;
    id: number;
    nombre_bomba: string;
    zona_distribucion: string;
};

type bombaState = {
    bombas: Bomba[];
    activeId: Bomba['id'];
    addBomba: (data: DraftBomba) => Promise<void>;
    deleteBomba: (id: Bomba['id']) => Promise<void>;
    getBombaById: (id: Bomba['id']) => void; //para editar
    updateBomba: (data: DraftBomba) => Promise<void>; //para editar
    fetchBombas: () => Promise<void>; // para obtener bombas de supabase
};

// Función para mapear de Row (Supabase) a Bomba (local)
const mapRowToBomba = (row: Row): Bomba => ({
    id: row.id.toString(), // Convertimos id de number a string
    name: row.nombre_bomba, // Mapeamos nombre_bomba a name
    direccion: row.direccion,
    bombeo: row.capacidad_bombeo, // Mapeamos capacidad_bombeo a bombeo
    zonas: row.zona_distribucion.split(',') // Suponemos que zona_distribucion es un string separado por comas
});

export const useBombaStore = create<bombaState>()(
    devtools(
        (set, get) => ({
            bombas: [],
            activeId: '',

            // Fetch bombas from Supabase and map them to Bomba type
            fetchBombas: async () => {
                const { data, error } = await supabase.from('bombas').select('*');
                if (error) {
                    console.error('Error obteniendo bombas', error.message);
                    throw error;
                }

                const bombasMapped = (data as Row[]).map(mapRowToBomba);
                set({ bombas: bombasMapped });
            },

            // Add a new bomba to both the local state and Supabase
            addBomba: async (data: DraftBomba) => {
                const newBomba = { ...data, id: uuidv4() }; // Creamos un ID único para la nueva bomba

                const { error } = await supabase.from('bombas').insert([{
                    nombre_bomba: newBomba.name,
                    direccion: newBomba.direccion,
                    capacidad_bombeo: newBomba.bombeo,
                    zona_distribucion: newBomba.zonas.join(',') // Unimos las zonas en una string separada por comas
                }]);

                if (error) {
                    console.error('Error agregando bomba a Supabase', error.message);
                    throw error;
                }

                // Actualizamos el estado local
                set((state) => ({
                    bombas: [...state.bombas, newBomba]
                }));
            },

            // Delete a bomba from both the local state and Supabase
            deleteBomba: async (id: Bomba['id']) => {
                const { error } = await supabase.from('bombas').delete().eq('id', parseInt(id)); // Convertimos a número si es necesario
                if (error) {
                    console.error('Error eliminando bomba de Supabase', error.message);
                    throw error;
                }

                set((state) => ({
                    bombas: state.bombas.filter(bomba => bomba.id !== id)
                }));
            },

            // Set the activeId to be used for updating
            getBombaById: (id: Bomba['id']) => {
                set(() => ({
                    activeId: id
                }));
            },

            // Update bomba both locally and in Supabase
            updateBomba: async (data: DraftBomba) => {
                const { activeId } = get();
                const updatedBomba = { id: activeId, ...data };

                const { error } = await supabase.from('bombas').update({
                    nombre_bomba: updatedBomba.name,
                    direccion: updatedBomba.direccion,
                    capacidad_bombeo: updatedBomba.bombeo,
                    zona_distribucion: updatedBomba.zonas.join(',')
                }).eq('id', parseInt(activeId)); // Convertimos a número si es necesario

                if (error) {
                    console.error('Error actualizando bomba en Supabase', error.message);
                    throw error;
                }

                set((state) => ({
                    bombas: state.bombas.map(bomba =>
                        bomba.id === activeId ? updatedBomba : bomba
                    ),
                    activeId: ''
                }));
            }
        })
    )
);