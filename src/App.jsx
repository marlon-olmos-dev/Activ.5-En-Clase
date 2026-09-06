import {
  BrowserRouter,
  Routes,
  Route,
  Link,
} from "react-router-dom";

import Login from "./pages/Login";
import Registro from "./pages/Registro";
import Comisiones from "./pages/Comisiones";
import RutaPrivada from "./components/RutaPrivada";

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/login">Iniciar sesión</Link>{" "}
        <Link to="/registro">Crear cuenta</Link>{" "}
        <Link to="/comisiones">Área privada</Link>
      </nav>

      <Routes>
        <Route
          path="/"
          element={
            <main>
              <h1>TP Desarrollo Web</h1>
              <p>Aplicación de autenticación.</p>
            </main>
          }
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/registro"
          element={<Registro />}
        />

        <Route
          path="/comisiones"
          element={
            <RutaPrivada>
              <Comisiones />
            </RutaPrivada>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;