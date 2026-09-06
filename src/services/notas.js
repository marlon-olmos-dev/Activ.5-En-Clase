import { supabase } from "./supabase";

export async function crearNota(contenido) {
    const { data, error } = await supabase
    .from("notas")
    .insert({
        contenido,
    })
    .select()
    .single();

    if (error) {
    throw error;
    }

    return data;
}

export async function obtenerNotas() {
    const { data, error } = await supabase
    .from("notas")
    .select("*")
    .order("id", { ascending: false });

    if (error) {
    throw error;
    }

    return data;
}