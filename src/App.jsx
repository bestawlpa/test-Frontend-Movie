import { useRoutes } from "react-router-dom";
import Home from "./page/Home";
import Popular from "./page/Popular";
import Cart from "./page/Cart";
import Checkout from "./page/Checkout";
import Order from "./page/Order";
import Search from "./page/Search";
import { CartProvider } from "./context/CartContext";
import { OrderProvider } from "./context/OrderContext";

function App() {
  const routes = [
    { path: "/", element: <Home /> },
    { path: "/popular", element: <Popular /> },
    { path: "/cart", element: <Cart /> },
    { path: "/checkout", element: <Checkout /> },
    { path: "/order", element: <Order /> },
    { path: "/search", element: <Search /> },
  ];

  const element = useRoutes(routes);
  return (
    <CartProvider>
      <OrderProvider>{element}</OrderProvider>
    </CartProvider>
  );
}

export default App;
