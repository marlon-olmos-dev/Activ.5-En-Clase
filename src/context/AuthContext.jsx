import {
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";

import { supabase } from "../services/supabase";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [sesion, setSesion] = useState(null);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
    async function cargarSesion() {
        const { data, error } = await supabase.auth.getSession();

        if (error) {
        console.error("Error al obtener la sesión:", error);
        }

        setSesion(data?.session ?? null);
        setCargando(false);
    }

    cargarSesion();

    const {
        data: { subscription },
    } = supabase.auth.onAuthStateChange(
        (_evento, nuevaSesion) => {
        setSesion(nuevaSesion);
        }
    );

    return () => {
        subscription.unsubscribe();
    };
    }, []);

    return (
    <AuthContext.Provider value={{ sesion, cargando }}>
        {children}
    </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}