import { useForm } from "react-hook-form";
import { registrarse } from "../services/auth";

export default function RegisterForm() {
    const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    } = useForm();

    const password = watch("password");

    const onSubmit = async (datos) => {
    try {
        await registrarse(datos.email, datos.password);
        alert("Usuario registrado correctamente");
    } catch (error) {
        alert(error.message);
    }
    };

    return (
    <form onSubmit={handleSubmit(onSubmit)}>
        <h2>Crear cuenta</h2>

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

        <label htmlFor="confirmar">Confirmar contraseña</label>

        <input
        id="confirmar"
        type="password"
        {...register("confirmar", {
            required: "Tenés que confirmar la contraseña",
            validate: (valor) =>
            valor === password ||
            "Las contraseñas no coinciden",
        })}
        />

        {errors.confirmar?.message && (
        <p>{errors.confirmar.message}</p>
        )}

        <button type="submit">
        Registrarme
        </button>
    </form>
    );
}