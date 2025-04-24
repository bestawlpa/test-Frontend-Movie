import React, { createContext, useState, useEffect } from "react";
import Swal from "sweetalert2";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (movie) => {
    setCart((e) => {
      const isAlreadyInCart = e.some((item) => item.id === movie.id);

      if (isAlreadyInCart) {
        Swal.fire({
          title: "สินค้านี้อยู่ในตะกร้าแล้ว!",
          icon: "warning",
          timer: 1000,
          showConfirmButton: false,
        });
        return e;
      }

      const updatedCart = [...e, movie];
      localStorage.setItem("cart", JSON.stringify(updatedCart));

      Swal.fire({
        title: "สินค้าถูกเพิ่มลงในตะกร้าแล้ว!",
        icon: "success",
        timer: 1000,
        showConfirmButton: false,
      });

      return updatedCart;
    });
  };

  const removeFromCart = (movieId) => {
    setCart((e) => {
      const updatedCart = e.filter((item) => item.id !== movieId);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};
