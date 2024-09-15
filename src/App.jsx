import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Nav from "./components/SlideMenu/Nav";
import ListadoProducto from "./components/insumos/ListadoProducto";
import AgregarProducto from "./components/insumos/AgregarProducto";
import EditarProducto from "./components/insumos/EditarProducto";
import LoginForm from "./components/LoginForm/LoginForm";
import Cultivo from "./components/cultivo/Cultivo";
import Producto from "./components/producto/Producto";
import Estadisticas from "./components/estadistica/Estadisticas";

const Layout = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === "/";

  return (
    <div>
      {!isLoginPage && <Nav />}
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/insumos" element={<ListadoProducto />} />
        <Route path="/agregar" element={<AgregarProducto />} />
        <Route path="/editar/:id" element={<EditarProducto />} />
        <Route path="/cultivo" element={<Cultivo />} />
        <Route path="/producto" element={<Producto />} />
        <Route path="/estadistica" element={<Estadisticas />} />
      </Routes>
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}

export default App;
