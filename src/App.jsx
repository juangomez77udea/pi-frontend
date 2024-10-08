import { BrowserRouter, Route, Routes, useLocation, Navigate } from "react-router-dom";
import { Auth0Provider, useAuth0 } from "@auth0/auth0-react";
import Nav from "./components/SlideMenu/Nav";
import ListadoProducto from "./components/insumos/ListadoProducto";
import AgregarProducto from "./components/insumos/AgregarProducto";
import EditarProducto from "./components/insumos/EditarProducto";
import LoginForm from "./components/LoginForm/LoginForm";
import Cultivo from "./components/cultivo/Cultivo";
import Producto from "./components/producto/Producto";
import Estadisticas from "./components/estadistica/Estadisticas";
import Lotes from "./components/lotes/Lotes";

// Usar import.meta.env en Vite para obtener los valores de Auth0
const domain = import.meta.env.VITE_AUTH0_DOMAIN;
const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;

const Layout = () => {
  const location = useLocation();
  const { isAuthenticated, isLoading } = useAuth0();

  // Mostrar pantalla de carga mientras Auth0 verifica la autenticación
  if (isLoading) {

    //todo(spinner) 
    return <div>Cargando...</div>;
  }

  // Si no está autenticado, mostrar el LoginForm
  if (!isAuthenticated) {
    return <LoginForm />;
  }

  // Redirigir a /insumos si está autenticado y en la página de login
  if (location.pathname === "/") {
    return <Navigate to="/insumos" />;
  }

  const isLoginPage = location.pathname === "/";

  return (
    <div>
      {!isLoginPage && <Nav />}
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/insumos" element={<ListadoProducto />} />
        <Route path="/agregar" element={<AgregarProducto />} />
        <Route path="/editar/:id" element={<EditarProducto />} />
        <Route path="/lotes" element={<Lotes />}/>
        <Route path="/cultivo" element={<Cultivo />} />
        <Route path="/producto" element={<Producto />} />
        <Route path="/estadistica" element={<Estadisticas />} />
      </Routes>
    </div>
  );
};

function App() {
  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
    >
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </Auth0Provider>
  );
}

export default App;
