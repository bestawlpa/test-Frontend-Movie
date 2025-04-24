import React, { createContext, useState, useEffect, Children } from "react";

export const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [order, setOrder] = useState(() => {
    const saveOrder = localStorage.getItem("order");
    return saveOrder ? JSON.parse(saveOrder) : [];
  });
  const [message, setMessage] = useState("");

  const confirmOrder = (movie) => {
    setOrder((e) => {
      const updatedOrder = [...e, movie];
      localStorage.setItem("order", JSON.stringify(updatedOrder));

      setMessage("confirmOrdert success!");

      setTimeout(() => {
        setMessage("");
      }, 1000);
      return updatedOrder;
    });
  };

  const removeFromOrder = (orderId) => {
    setOrder((e) => {
      const updatedOrder = e.filter((item) => item.id !== orderId);
      localStorage.setItem("order", JSON.stringify(updatedOrder));
      return updatedOrder;
    });
  };

  return (
    <OrderContext.Provider
      value={{ order, confirmOrder, message, removeFromOrder }}
    >
      {children}
    </OrderContext.Provider>
  );
};
