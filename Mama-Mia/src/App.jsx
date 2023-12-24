import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";

// Views
import Home from "./views/Home";
import Pizza from "./views/Pizza";
import ShoppingCart from "./views/ShoppingCart";
import NotFound from "./views/NotFound";

// Toastify
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pizza/:id" element={<Pizza />} />
        <Route path="/carrito" element={<ShoppingCart />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <ToastContainer /> {/* Necesario para que funcione Toastify*/}
    </div>
  );
};
export default App;
