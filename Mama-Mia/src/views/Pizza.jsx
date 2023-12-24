import { useParams } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";

// Componentes de Bootstrap
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/ListGroupItem";
import Button from "react-bootstrap/Button";

// Notificación de Toastify
import { toast } from "react-toastify";

function Pizza() {
  const { allPizzas, cart, setCart } = useContext(UserContext);
  const { id } = useParams();
  const navigate = useNavigate();

  // Encontrar la información de la pizza correspondiente al 'id' de la URL
  const pizzaInfo = allPizzas.find((pizza) => pizza.id === id);

  const cartAdd = (pizza) => {
    navigate(`/carrito`);
    // Verificar si la pizza ya está en el carrito
    const existingPizza = cart.find((item) => item.id === pizza.id);
    if (existingPizza) {
      // Si la pizza ya está en el carrito, incrementar la cantidad
      existingPizza.quantity = (existingPizza.quantity || 1) + 1; // Gracias a la mutabilidad de los objetos agregué la llave: quantity
      setCart([...cart]);
    } else {
      // Si la pizza no está en el carrito, agregarla con cantidad 1
      setCart([...cart, { ...pizza, quantity: 1 }]);
    }
    toast.success(`🍕 Pizza ${pizza.name} Agregada al Carrito!`, {
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

  function backButton() {
    navigate(`/`);
  }

  return (
    <>
      <div className="p-4">
        {pizzaInfo && (
          <Card
            className="d-flex flex-lg-row justify-content-center flex-sm-column"
            key={pizzaInfo.id}
          >
            <Card.Img variant="top" src={pizzaInfo.img} />
            <div className="d-flex flex-column">
              <Card.Body>
                <Card.Title className="mb-3">{pizzaInfo.name}</Card.Title>
                <ListGroup>
                  <ListGroupItem>{pizzaInfo.desc}</ListGroupItem>
                  <ListGroupItem>
                    <p>
                      <b>Ingredientes: </b>
                    </p>
                    {pizzaInfo.ingredients.map((ingredient, index) => (
                      <li key={index}>🍕{ingredient}</li>
                    ))}
                  </ListGroupItem>
                </ListGroup>
              </Card.Body>
              <Card.Body className="d-flex flex-row align-items-center justify-content-between">
                <Card.Title className="text-center">
                  Precio: ${pizzaInfo.price.toLocaleString("es-CL")}
                </Card.Title>
                <div className="d-flex justify-content-center gap-2">
                  <Button
                    onClick={() => backButton()}
                    className="bg-info ver-mas"
                  >
                    Atrás
                  </Button>
                  <Button
                    onClick={() => cartAdd(pizzaInfo)}
                    className="bg-danger"
                  >
                    Añadir
                  </Button>
                </div>
              </Card.Body>
            </div>
          </Card>
        )}
      </div>
    </>
  );
}

export default Pizza;
