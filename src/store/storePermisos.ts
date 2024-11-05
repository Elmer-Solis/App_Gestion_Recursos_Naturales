import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import supabase from '@/supabase/supabase.config';
import { v4 as uuidv4 } from 'uuid';

// Tipo de datos del usuario
export interface User {
    id: string;
    email: string;
    role: string;
}

// Tipo de datos para crear un usuario (sin `id` porque se generará automáticamente)
export type DraftPermisos = Omit<User, 'id'>;

// Estado y funciones del store
type UserRow = {
    id: number;
    email: string;
    role: string
}

type solicitudUserState = {
    permisos: User[];
    activePermisosId: User['id'];
    addPermiso: (data: DraftPermisos) => Promise<void>; // Cambiar a DraftPermisos
    deletePermiso: (id: User['id']) => Promise<void>;
    getPermisoById: (id: User['id']) => void;
    updatePermiso: (data: DraftPermisos) => Promise<void>; // Cambiar a DraftPermisos
    fetchPermiso: () => Promise<void>;
    setActivePermisoId: (id: string) => void;
};

const mapRowToSolicitud = (row: UserRow): User => ({
    id: row.id.toString(),
    email: row.email,
    role: row.role
});


export const usePermisoStore = create<solicitudUserState>()(
    devtools(
        (set, get) => ({
            permisos: [],
            activePermisosId: '',

            // Fetch solicitudes de trabajo de Supabase
            fetchPermiso: async () => {
                const { data, error } = await supabase.from('users').select('*');
                if (error) {
                    console.error('Error obteniendo solicitudes de trabajo', error.message);
                    throw error;
                }

                const solicitudesMapped = (data as UserRow[]).map(mapRowToSolicitud);
                set({ permisos: solicitudesMapped });
            },

            // Añadir nueva solicitud de trabajo con los campos nuevos
            addPermiso: async (data: DraftPermisos) => {
                const newPermiso = { ...data, id: uuidv4() };

                const { error } = await supabase.from('users').insert([{
                    email: newPermiso.email,
                    role: newPermiso.role,
                }]);

                if (error) {
                    console.error('Error agregando solicitud de trabajo a Supabase', error.message);
                    throw error;
                }

                set((state) => ({
                    permisos: [...state.permisos, newPermiso]
                }));
            },

            // Eliminar solicitud de trabajo
            deletePermiso: async (id: User['id']) => {
                const { error } = await supabase.from('users').delete().eq('id', parseInt(id));
                if (error) {
                    console.error('Error eliminando solicitud de trabajo de Supabase', error.message);
                    throw error;
                }

                set((state) => ({
                    permisos: state.permisos.filter((permiso) => permiso.id !== id)
                }));
            },

            // Obtener solicitud por ID
            getPermisoById: (id: User['id']) => {
                set({ activePermisosId: id });
            },

            // Actualizar solicitud de trabajo, con los nuevos campos incluidos
            updatePermiso: async (data: DraftPermisos) => {
                const { error } = await supabase
                    .from('users')
                    .update({
                        email: data.email,
                        role: data.role,
                    })
                    .eq('id', parseInt(get().activePermisosId));

                if (error) {
                    console.error('Error actualizando solicitud de trabajo en Supabase', error.message);
                    throw error;
                }

                set((state) => ({
                    permisos: state.permisos.map((permiso) =>
                        permiso.id === get().activePermisosId ? { ...permiso, ...data } : permiso
                    )
                }));
            },
            // Añadir la función para limpiar o modificar el activeSolicitudId
            setActivePermisoId: (id: string) => set({ activePermisosId: id }), // Esta es la nueva función
        })
    )
);