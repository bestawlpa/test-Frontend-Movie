import { useState, useContext, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { OrderContext } from "../context/OrderContext";

function Order() {
  const urlImg = import.meta.env.VITE_TMDB_IMAGE_BASE_URL;
  const { order, removeFromOrder } = useContext(OrderContext);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [payOpen, setPayOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    let timer;
    if (isPopupVisible && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    }

    if (timeLeft === 0 || !isPopupVisible) {
      setIsPopupVisible(false);
      setPayOpen(false);
      clearInterval(timer);
    }

    return () => clearInterval(timer);
  }, [isPopupVisible, timeLeft]);

  const handlePay = (orderItem) => {
    setSelectedOrder(orderItem);
    setIsPopupVisible(true);
    setTimeLeft(60);
  };

  const handleOpenPay = (isOpen) => {
    setPayOpen(isOpen);
  };

  return (
    <div className="w-screen h-screen flex flex-col bg-[#FFFFFF]">
      <Header />

      <main className=" flex-grow overflow-y-auto flex justify-center px-40 bg-[#3C3D37]">
        <div className=" text-white">
          <div className=" my-8 p-6 w-[550px] rounded-2xl ">
            {order.length > 0 ? (
              order.map((e) => (
                <div
                  key={e.id}
                  className=" flex justify-between items-center bg-gray-800 p-6 mb-4 rounded-2xl"
                >
                  <div>
                    <h1 className=" mb-4 font-extrabold">Order_Id : {e.id}</h1>
                    {e.movies.map((item) => (
                      <div key={item.id} className="flex items-center my-2">
                        <img
                          src={`${urlImg}${item.poster_path}`}
                          alt={item.title}
                          className="w-[25px] h-[25px] object-cover rounded-lg mr-4"
                        />
                        <h2 className=" font-extralighttext-lg">
                          {item.title}
                        </h2>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-col  items-end w-[120px] h-full ">
                    <p className="text-xl font-bold">
                      ฿<span className=" text-red-600 mx-2">{e.total}</span>
                    </p>
                    <div className=" w-full mt-4 h-[50px] flex justify-between text-lg">
                      <button
                        onClick={() => removeFromOrder(e.id)}
                        className="text-red-600 mt-2 px-4 py-1 hover:border-b-2"
                      >
                        cancel
                      </button>
                      <button
                        onClick={() => {
                          handlePay();
                          handleOpenPay(true);
                          handlePay(e);
                        }}
                        className=" text-green-600 mt-2 hover:border-b-2"
                      >
                        pay
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>Your order is empty.</p>
            )}
          </div>

          {isPopupVisible && (
            <div className=" flex items-center justify-center fixed inset-0 z-40">
              <div className="bg-white py-6 px-4 rounded-lg text-center w-[400px]  relative shadow-lg">
                <h2 className="font-bold text-xl text-red-600">
                  Payment Details
                </h2>
                <p className=" my-2 font-bold text-lg text-black">
                  transfer the money to the{" "}
                  <span className="  text-red-600">121-2312-12121</span>
                </p>
                <p className=" my-2 font-bold text-lg text-black">
                  Price:{" "}
                  <span className="mx-2 text-red-600">
                    {selectedOrder.total}
                  </span>{" "}
                  ฿
                </p>
                <p className="font-bold text-lg text-black">
                  Please transfer within
                  <span className=" mx-2 text-red-600">{timeLeft}</span>{" "}
                  seconds.
                </p>

                <div className="mt-4">
                  <button
                    onClick={() => {
                      setIsPopupVisible(false);
                      handleOpenPay(false);
                      setSelectedOrder(null);
                    }}
                    className="bg-red-600 text-white px-4 py-1 rounded font-bold"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}
          {payOpen && (
            <div className="fixed inset-0 bg-black opacity-60 z-10" />
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Order;
