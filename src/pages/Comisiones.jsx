import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import {
    crearNota,
    obtenerNotas,
} from "../services/notas";
import { cerrarSesion } from "../services/auth";

export default function Comisiones() {
    const { sesion } = useAuth();

    const [contenido, setContenido] = useState("");
    const [notas, setNotas] = useState([]);
    const [cargando, setCargando] = useState(true);

    async function cargarNotas() {
    try {
        const datos = await obtenerNotas();
        setNotas(datos);
    } catch (error) {
        console.error("Error al cargar notas:", error);
    } finally {
        setCargando(false);
    }
    }

    useEffect(() => {
    cargarNotas();
    }, []);

async function manejarNuevaNota(evento) {
    evento.preventDefault();

    if (!contenido.trim()) {
    console.log("La nota está vacía");
    return;
    }

    console.log("Intentando guardar:", contenido);

    try {
    const nuevaNota = await crearNota(contenido);

    console.log("Nota guardada correctamente:", nuevaNota);

    setNotas((notasActuales) => [
        nuevaNota,
        ...notasActuales,
    ]);

    setContenido("");
    } catch (error) {
    console.error("ERROR AL GUARDAR LA NOTA:", error);
    alert(`No se pudo guardar la nota: ${error.message}`);
    }
}

async function manejarCierreSesion() {
    try {
    await cerrarSesion();
    } catch (error) {
    console.error("Error al cerrar sesión:", error);
    }
}

    return (
    <main>
        <h1>Área de trabajo</h1>

        <p>
        Bienvenido, <strong>{sesion.user.email}</strong>
        </p>

        <button onClick={manejarCierreSesion}>
            Cerrar sesión
        </button>

        <section>
        <h2>Mis notas</h2>

        <form onSubmit={manejarNuevaNota}>
            <input
            type="text"
            value={contenido}
            onChange={(evento) =>
                setContenido(evento.target.value)
            }
            placeholder="Escribí una nota..."
            />

            <button type="submit">
            Guardar nota
            </button>
        </form>

        {cargando ? (
            <p>Cargando notas...</p>
        ) : notas.length === 0 ? (
            <p>Todavía no tenés notas.</p>
        ) : (
            <ul>
            {notas.map((nota) => (
                <li key={nota.id}>
                {nota.contenido}
                </li>
            ))}
            </ul>
        )}
        </section>
    </main>
    );
}