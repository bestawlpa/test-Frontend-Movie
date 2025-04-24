import React, { useContext, useState } from "react";
import { useLocation } from "react-router-dom";
import { OrderContext } from "../context/OrderContext";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Checkout = () => {
  const { confirmOrder } = useContext(OrderContext);
  const { state } = useLocation();
  const { selectedItems, priceMovie } = state;
  const urlImg = import.meta.env.VITE_TMDB_IMAGE_BASE_URL;
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "test",
    address: "bangkok",
    phone: "123456789",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const totalPrice = selectedItems.reduce((total, item) => {
    const itemPrice = parseFloat(priceMovie[item.id]) || 0;
    return total + itemPrice;
  }, 0);

  const getDiscount = (itemCount) => {
    if (itemCount > 5) {
      return 0.2;
    } else if (itemCount > 3) {
      return 0.1;
    }
    return 0;
  };

  const discount = getDiscount(selectedItems.length);
  const discountedPrice = totalPrice - totalPrice * discount;

  const handleConfirmOrder = () => {
    if (!formData.name) {
      Swal.fire({
        title: "กรุณากรอกชื่อของคุณ",
        icon: "warning",
        confirmButtonText: "ตกลง",
      });
      return;
    }

    if (!formData.address) {
      Swal.fire({
        title: "กรุณากรอกที่อยู่",
        icon: "warning",
        confirmButtonText: "ตกลง",
      });
      return;
    }

    if (!formData.phone) {
      Swal.fire({
        title: "กรุณากรอกเบอร์โทรศัพท์",
        icon: "warning",
        confirmButtonText: "ตกลง",
      });
      return;
    }

    const phoneIsValid = /^[0-9]+$/.test(formData.phone);
    if (!phoneIsValid) {
      Swal.fire({
        title: "เบอร์โทรศัพท์ต้องเป็นตัวเลขเท่านั้น",
        icon: "warning",
        confirmButtonText: "ตกลง",
      });
      return;
    }

    const orderData = {
      id: Date.now(),
      customer: formData,
      movies: selectedItems,
      total: discountedPrice,
      timestamp: new Date().toISOString(),
    };

    confirmOrder(orderData);

    Swal.fire({
      title: "Order placed successfully!",
      icon: "success",
      timer: 1000,
      showConfirmButton: false,
    }).then(() => {
      navigate("/order");
    });
  };

  return (
    <div className="w-screen h-screen flex flex-col bg-[#FFFFFF]">
      <Header />

      <main className=" flex-grow overflow-y-auto flex flex-col items-center px-40  bg-[#3C3D37]">
        <div className="my-8 flex h-full flex-col justify-center items-center">
          <div className=" w-[820px]  overflow-hidden flex justify-between rounded-lg ">
            <div className=" w-[440px] h-full flex flex-col justify-center items-center py-4 pr-4 text-white">
              <h1 className="my-6 font-black text-3xl">Shopping Information</h1>
              <div className=" w-full flex justify-between ">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  placeholder="Name"
                  onChange={handleChange}
                  className=" h-10 w-full p-2 my-4 rounded-md outline-none border-2 border-white"
                />
              </div>
              <div className=" w-full">
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Address"
                  className=" h-10 w-full p-2 my-4 rounded-md outline-none border-2 border-white"
                />
              </div>
              <div className=" w-full">
                <input
                  type="tell"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Phone number"
                  className=" h-10 w-full p-2 my-4 rounded-md outline-none border-2 border-white"
                />
              </div>

              <div className=" w-full flex justify-center mt-8">
                <button
                  onClick={handleConfirmOrder}
                  className=" px-4 py-2 bg-blue-600 text-white rounded-md"
                >
                  Confirm Order
                </button>
              </div>
            </div>

            <div className=" w-[320px] h-[400px] overflow-auto bg-[#D9DFC6] rounded-lg p-3 ">
              {selectedItems.map((item) => (
                <div
                  key={item.id}
                  className=" w-full h-[80px] flex items-center py-2  border-b-2 border-white"
                >
                  <img
                    src={`${urlImg}${item.poster_path}`}
                    alt=""
                    className=" w-12 h-12 object-fill rounded-full border-2 border-slate-100 "
                  />
                  <div className=" flex flex-col pl-6 w-full">
                    <p className="  line-clamp-1">{item.title}</p>
                    <div className=" flex justify-between">
                      ฿{priceMovie[item.id]}
                    </div>
                  </div>
                </div>
              ))}

              <div>
                <div className=" my-2 font-bold w-[296px] flex justify-between pr-4">
                  <h2>Total:</h2>
                  <span className=" text-red-600">
                    {totalPrice.toFixed(2)}{" "}
                    <span className=" text-black">฿</span>
                  </span>
                </div>
                {discount > 0 && (
                  <div className=" font-bold w-[296px] flex justify-end pr-4">
                    <h3 className=" text-green-600 font-semibold">
                      Discount {discount * 100}% off
                    </h3>
                  </div>
                )}
                <div className=" my-2 font-bold w-[296px] flex justify-between pr-4">
                  <h2>Total After Discount:</h2>
                  <span className=" text-red-600">
                    {discountedPrice.toFixed(2)}{" "}
                    <span className=" text-black">฿</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Checkout;
