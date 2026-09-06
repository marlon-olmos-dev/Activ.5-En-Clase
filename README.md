# Actividad 5 - Desarrollo Web

Este proyecto corresponde a la Actividad 5 de Desarrollo Web.

La aplicación fue realizada utilizando React y Supabase. El objetivo principal fue trabajar con formularios, autenticación de usuarios, rutas protegidas y una tabla propia en Supabase utilizando RLS.

## ¿Qué tiene la aplicación?

La aplicación permite:

- Registrarse con un correo y contraseña.
- Iniciar sesión.
- Validar los datos de los formularios.
- Mantener la sesión del usuario.
- Acceder a una sección privada solamente cuando el usuario está logueado.
- Crear y mostrar notas.
- Cerrar sesión.

## Tecnologías utilizadas

- React
- Vite
- JavaScript
- React Hook Form
- React Router
- Supabase

## Organización del proyecto

Dentro de `src` se separaron los archivos según su función:

- `components`: contiene los formularios y la ruta privada.
- `context`: contiene el contexto utilizado para manejar la sesión.
- `pages`: contiene las diferentes páginas de la aplicación.
- `services`: contiene la conexión con Supabase y las funciones relacionadas con autenticación y notas.

## Autenticación

Para el registro e inicio de sesión se utilizó Supabase Auth.

El formulario de registro también tiene una validación para comprobar que la contraseña y su confirmación sean iguales.

La sesión se controla desde `AuthContext`, donde se obtiene la sesión actual y se escucha si hay cambios en el estado de autenticación.

Además, se creó `RutaPrivada` para evitar que un usuario que no inició sesión pueda acceder a la sección privada.

## Tabla notas y RLS

Se creó una tabla llamada `notas` en Supabase con los campos:

- `id`
- `user_id`
- `contenido`

El campo `user_id` se completa automáticamente utilizando `auth.uid()`, por lo que desde React solamente se envía el contenido de la nota.

También se activó RLS (Row Level Security) en la tabla.

La política principal utiliza:

`auth.uid() = user_id`

Esto hace que cada usuario solamente pueda ver y trabajar con las notas que le pertenecen.

Se agregaron políticas para:

- Ver sus propias notas.
- Crear sus propias notas.
- Modificar sus propias notas.
- Eliminar sus propias notas.

De esta manera, aunque dos usuarios utilicen la aplicación, las notas de uno no deberían quedar disponibles para el otro.

## Para ejecutar el proyecto

Primero instalar las dependencias:

```bash
npm install