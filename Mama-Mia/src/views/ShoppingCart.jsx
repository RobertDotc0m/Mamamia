import { useContext, useEffect } from "react";
import { UserContext } from "../context/userContext";

// Componente de Bootstrap
import Button from "react-bootstrap/Button";

// Notificación de Toastify
import { toast } from "react-toastify";

// Sweet Alert 2
import Swal from "sweetalert2";

function ShoppingCart() {
  const { cart, setCart, totalToPay, setTotalToPay } = useContext(UserContext);

  const increaseQuantity = (pizzaId) => {
    const updatedCart = cart.map((pizza) =>
      pizza.id === pizzaId
        ? { ...pizza, quantity: (pizza.quantity || 1) + 1 }
        : pizza
    );
    setCart(updatedCart);
    toast.success(`🍕 Pizza Agregada al Carrito!`, {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  const decreaseQuantity = (pizzaId) => {
    const updatedCart = cart
      .map((pizza) =>
        pizza.id === pizzaId
          ? { ...pizza, quantity: (pizza.quantity || 1) - 1 } // Disminuir la cantidad en 1
          : pizza
      )
      .filter((pizza) => pizza.quantity > 0); // Filtrar las pizzas con cantidad mayor que 0
    setCart(updatedCart);
    toast.error(`🍕 Pizza Eliminada del Carrito!`, {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  // Calcular el total a pagar sumando el precio de todas las pizzas en el carrito.
  const total = cart.reduce(
    (total, pizza) => total + pizza.price * (pizza.quantity || 1),
    0
  );

  const payButton = () => {
    if (totalToPay == 0) {
      Swal.fire({
        title: "No tienes pizzas en tu carrito",
        text: "",
        icon: "warning",
        showCancelButton: false,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Ahora agrego",
      });
    } else {
      Swal.fire({
        title: "¿Listo para pagar?",
        text: "Tenemos todos los métodos de pago",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Pagar",
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            "Conectando con Webpay",
            "Elige tu método de pago",
            "success"
          );
        }
      });
    }
  };

  // Actualizar el total a pagar cuando cambie el carrito.
  useEffect(() => {
    setTotalToPay(total.toLocaleString("es-CL"));
  }, [cart]);

  return (
    <>
      <div className="px-sm-5 mx-sm-5">
        <div className="p-md-5 pt-5 px-2 mb-lg-0 mb-5">
          <p>
            <b>Detalles del pedido:</b>
          </p>
          {cart.map((pizza, index) => (
            <div
              className="d-flex justify-content-between align-items-center p-3"
              key={index}
            >
              <div className="d-flex flex-lg-row flex-column justify-content-between align-items-lg-center align-items-start gap-1">
                <img
                  className="imagen-carrito"
                  src={pizza.img}
                  alt={`imagen de la pizza ${pizza.name}`}
                />
                <p className="m-0">
                  <b>{pizza.name}</b>
                </p>
              </div>
              <div className="d-flex justify-content-between align-items-center gap-1">
                <p className="text-success m-0">
                  <b>
                    $
                    {(pizza.price * (pizza.quantity || 1)).toLocaleString(
                      "es-CL"
                    )}
                  </b>
                </p>
                <Button
                  onClick={() => decreaseQuantity(pizza.id)}
                  className="bg-danger"
                >
                  -
                </Button>
                <p className="m-0">
                  <b>{pizza.quantity || 1}</b>
                </p>
                <Button
                  onClick={() => increaseQuantity(pizza.id)}
                  className="bg-primary mas"
                >
                  +
                </Button>
              </div>
            </div>
          ))}
          <div className="d-flex flex-column align-items-lg-start align-items-center">
            <h3>Total: ${totalToPay}</h3>
            <div>
              <Button onClick={() => payButton()} className="bg-success pagar">
                Ir a Pagar
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ShoppingCart;
