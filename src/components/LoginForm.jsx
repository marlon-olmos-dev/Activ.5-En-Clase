import { useForm } from "react-hook-form";
import { iniciarSesion } from "../services/auth";

export default function LoginForm() {
    const {
    register,
    handleSubmit,
    formState: { errors },
    } = useForm();

    const onSubmit = async (datos) => {
    try {
        await iniciarSesion(datos.email, datos.password);
        alert("Inicio de sesión correcto");
    } catch (error) {
        alert(error.message);
    }
    };

    return (
    <form onSubmit={handleSubmit(onSubmit)}>
        <h2>Iniciar sesión</h2>

        <label htmlFor="email">Correo electrónico</label>

        <input
        id="email"
        type="email"
        {...register("email", {
            required: "El correo electrónico es obligatorio",
        })}
        />

        {errors.email?.message && (
        <p>{errors.email.message}</p>
        )}

        <label htmlFor="password">Contraseña</label>

        <input
        id="password"
        type="password"
        {...register("password", {
            required: "La contraseña es obligatoria",
            minLength: {
            value: 6,
            message: "La contraseña debe tener al menos 6 caracteres",
            },
        })}
        />

        {errors.password?.message && (
        <p>{errors.password.message}</p>
        )}

        <button type="submit">
        Ingresar
        </button>
    </form>
    );
}