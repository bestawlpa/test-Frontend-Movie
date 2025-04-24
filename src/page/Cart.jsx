import React, { useContext, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";

const Cart = () => {
  const { cart, removeFromCart } = useContext(CartContext);
  const [priceMovie, setPriceMovie] = useState({});
  const urlImg = import.meta.env.VITE_TMDB_IMAGE_BASE_URL;
  const [selectedMovies, setSelectedMovies] = useState([]);
  const navigate = useNavigate();
  console.log(selectedMovies);

  const handleCheckbox = (item, isChecked) => {
    if (isChecked) {
      setSelectedMovies((addItem) => {
        const updateItem = [...addItem];
        updateItem.push(item);
        return updateItem;
      });
    } else {
      setSelectedMovies((removeItem) => {
        const updateItem = removeItem.filter((selectItems) => {
          return selectItems.id !== item.id;
        });
        return updateItem;
      });
    }
  };

  const handlePriceChange = (value, movieId) => {
    setPriceMovie((e) => ({
      ...e,
      [movieId]: value,
    }));
  };

  const handleChackout = () => {
    if (selectedMovies.length === 0) {
      alert("Please select at least one item before proceeding to checkout.");
      return;
    } else if (
      selectedMovies.some(
        (movie) =>
          !priceMovie[movie.id] ||
          priceMovie[movie.id] === "" ||
          isNaN(priceMovie[movie.id])
      )
    ) {
      alert("Please enter a valid price for each selected item.");
      return;
    }
    navigate("/checkout", {
      state: {
        selectedItems: selectedMovies,
        priceMovie: priceMovie,
      },
    });
    selectedMovies.map((movie) => removeFromCart(movie.id));
    setSelectedMovies([]);
  };

  return (
    <div className="w-screen h-screen flex flex-col bg-[#FFFFFF]">
      <Header />

      <main className=" flex-grow overflow-y-auto flex flex-col items-center px-40  bg-[#3C3D37] ">
        <div className="my-8 flex flex-col justify-center items-center">
          {cart.length === 0 ? (
            <h1 className="text-white mt-7 text-4xl font-black">
              No movies in cart
            </h1>
          ) : (
            <div className=" flex flex-col items-center">
              {cart.map((e) => (
                <div
                  key={e.id}
                  className=" w-[600px] h-[120px] flex items-center  bg-gray-800 p-4 my-2 rounded-md"
                >
                  <div className=" w-[150px] flex  justify-between items-center">
                    <div className="flex items-center justify-center w-[30px] h-[30px] ">
                      <input
                        type="checkbox"
                        className="w-4 h-4 accent-green-500 cursor-pointer"
                        id={`checkbox-${e.id}`}
                        onChange={(item) =>
                          handleCheckbox(e, item.target.checked)
                        }
                      />
                    </div>
                    <div className=" w-[110px]">
                      <img
                        src={`${urlImg}${e.poster_path}`}
                        alt="movie_Img"
                        className="w-[100px] h-[100px] rounded-lg object-fill"
                      />
                    </div>
                  </div>
                  <div className="w-[430px] flex justify-between items-center ">
                    <div className=" flex justify-between items-center h-[120px] w-[350px] ">
                      <h1 className="text-white font-extrabold">{e.title}</h1>
                      <div>
                        <input
                          type="text"
                          value={priceMovie[e.id]}
                          placeholder="Price"
                          onChange={(item) =>
                            handlePriceChange(item.target.value, e.id)
                          }
                          className="w-[50px] bg-white flex items-center rounded-md px-2"
                        />
                      </div>
                    </div>

                    <button
                      onClick={() => removeFromCart(e.id)}
                      className="bg-red-500 w-[40px] h-[40px] ml-5 text-white rounded-full flex justify-center items-center"
                    >
                      <img
                        src="./remove-all-svgrepo-com.svg"
                        alt=""
                        className=" w-[25px] h-[25px]"
                      />
                    </button>
                  </div>
                </div>
              ))}
              <div className=" mt-6 mb-3">
                <button
                  onClick={handleChackout}
                  className=" px-4 py-2 bg-red-700 rounded-lg text-white relative"
                >
                  check out
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Cart;
