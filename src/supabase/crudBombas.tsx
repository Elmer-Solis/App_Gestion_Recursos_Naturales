import supabase from "./supabase.config";


export const getBombasBy = async () => {
    const { data, error } = await supabase
        .from('bombas')
        .select('*')
    if (error) {
        console.error('Error obteniendo bomba', error.message);
        throw error;
    }

    return data;
};
