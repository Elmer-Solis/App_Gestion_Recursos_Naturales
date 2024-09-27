import supabase from "./supabase.config";


// // Insertar un nuevo fontanero en la base de datos
// export const insertFontanero = async (fontanero: Fontanero) => {
//     const { data, error } = await supabase
//         .from('fontaneros') // Nombre de la tabla
//         .insert([
//             { ...fontanero }
//         ]);

//     if (error) {
//         console.error('Error insertando fontanero en Supabase:', error.message);
//         throw error;
//     }

//     return data; // Retorna los datos del fontanero insertado si es necesario
// };

// Eliminar un fontanero por ID
export const deleteFontaneroById = async (id: string) => {
    const { data, error } = await supabase
        .from('fontaneros')
        .delete()
        .eq('id', id);

    if (error) {
        console.error('Error eliminando fontanero en Supabase:', error.message);
        throw error;
    }

    return data;
};

// Obtener un fontanero por ID
// export const getFontaneroById = async (id: string) => {
//     const { data, error } = await supabase
//         .from('fontaneros')
//         .select('*')
//         .eq('id', id)
//         .single();

//     if (error) {
//         console.error('Error obteniendo fontanero por ID en Supabase:', error.message);
//         throw error;
//     }

//     return data;
// };
// Obtener un fontanero por ID
export const getFontaneroById = async () => {
    const { data, error } = await supabase
        .from('fontaneros')
        .select('*')
    if (error) {
        console.error('Error obteniendo fontanero por ID en Supabase:', error.message);
        throw error;
    }

    return data;
};




// // Actualizar un fontanero por ID
// export const updateFontaneroById = async (id: string, fontanero: Partial<Fontanero>) => {
//     const { data, error } = await supabase
//         .from('fontaneros')
//         .update({ ...fontanero })
//         .eq('id', id);

//     if (error) {
//         console.error('Error actualizando fontanero en Supabase:', error.message);
//         throw error;
//     }

//     return data;
// };