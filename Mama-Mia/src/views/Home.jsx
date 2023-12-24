import { useContext } from "react";
import { UserContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

import pizzas from "../views/pizzas.json";

import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/ListGroupItem";
import Button from "react-bootstrap/Button";

import Header from "../components/Header";

// Notificación de Toastify
import { toast } from "react-toastify";

const Home = () => {
  // Usar useContext para acceder a datos compartidos del usuario
  const { allPizzas, setAllPizzas, cart, setCart, setTotalToPay } =
    useContext(UserContext);

  // Inicializar la navegación
  const navigate = useNavigate();

  // Función para obtener las pizzas (cargar datos iniciales)
  const getPizzas = () => {
    try {
      // Mapear los datos de pizzas y guardarlos en el estado
      const pizzaArray = pizzas.map((pizza) => ({
        id: pizza.id,
        name: pizza.name,
        ingredients: pizza.ingredients,
        img: pizza.img,
        price: pizza.price,
        desc: pizza.desc,
      }));
      setAllPizzas(pizzaArray);
    } catch (error) {
      console.error("Error al obtener los datos:", error);
    }
  };

  // Ejecutar getPizzas() cuando el componente se monta
  useEffect(() => {
    getPizzas();
  }, []);

  // Función para manejar la navegación a la información detallada de la pizza
  const handleInfo = (pizzaId) => {
    navigate(`/pizza/${pizzaId}`);
  };

  // Función para agregar pizzas al carrito
  const cartAdd = (pizza) => {
    const existingPizza = cart.find((item) => item.id === pizza.id);

    if (existingPizza) {
      // Si la pizza ya está en el carrito, incrementar la cantidad
      existingPizza.quantity = (existingPizza.quantity || 1) + 1;
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

  // Calcular el total del carrito
  const total = cart.reduce(
    (total, pizza) => total + pizza.price * (pizza.quantity || 1),
    0
  );

  // Actualizar el total a pagar cuando cambie el carrito
  useEffect(() => {
    setTotalToPay(total);
  }, [cart]);

  return (
    <>
      <Header />
      <div className="d-flex flex-row flex-wrap justify-content-center gap-4 p-4 px-5">
        {allPizzas.map((pizza) => (
          <Card key={pizza.id} style={{ width: "14rem" }}>
            <Card.Img variant="top" src={pizza.img} />
            <Card.Body>
              <Card.Title>{pizza.name}</Card.Title>
              <ListGroup>
                <ListGroupItem>
                  <p>
                    <b>Ingredientes: </b>
                  </p>
                  {pizza.ingredients.map((ingredient, index) => (
                    <li key={index}>🍕{ingredient}</li>
                  ))}
                </ListGroupItem>
              </ListGroup>
            </Card.Body>
            <Card.Body>
              <Card.Title className="text-center">
                Precio: ${pizza.price.toLocaleString("es-CL")}
              </Card.Title>
              <div className="d-flex justify-content-center gap-2">
                <Button
                  onClick={() => handleInfo(pizza.id)}
                  className="bg-info ver-mas"
                >
                  Ver Más
                </Button>
                <Button onClick={() => cartAdd(pizza)} className="bg-danger">
                  Añadir
                </Button>
              </div>
            </Card.Body>
          </Card>
        ))}
      </div>
    </>
  );
};

export default Home;
