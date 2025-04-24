import { useState, useEffect, useContext } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { CartContext } from "../context/CartContext";

function Home() {
  const [movies, setMovies] = useState([]);
  const url = import.meta.env.VITE_TMDB_BASE_URL;
  const apiKey = import.meta.env.VITE_TMDB_API_KEY;
  const urlImg = import.meta.env.VITE_TMDB_IMAGE_BASE_URL;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 24;
  const { addToCart } = useContext(CartContext);
  const [isLoading, setIsLoading] = useState(true);

  const fetchMovies = async () => {
    try {
      const response = await fetch(`${url}/movie/changes?api_key=${apiKey}`);

      if (!response.ok) {
        throw new Error("Failed to fetch movie");
      }
      const data = await response.json();

      const total = data.results.length;
      setTotalPages(Math.ceil(total / itemsPerPage));

      const offset = (currentPage - 1) * itemsPerPage;
      const pagedMovies = data.results.slice(offset, offset + itemsPerPage);

      const movieIds = pagedMovies.map((movie) => movie.id);
      const movieDetails = await Promise.all(
        movieIds.map((id) =>
          fetch(`${url}/movie/${id}?api_key=${apiKey}`).then((res) =>
            res.json()
          )
        )
      );

      setMovies(movieDetails);
    } catch (error) {
      console.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, [currentPage]);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="w-screen h-screen flex flex-col bg-[#FFFFFF]">
      <Header />

      <main className=" flex-grow overflow-y-auto flex justify-center px-40  bg-[#3C3D37]">
        <div className="  my-14 ">
          {isLoading ? (
            <div className="absolute top-1/2 left-1/2 transform z-20 -translate-x-1/2 text-white text-3xl font-bold">
              Loading...
            </div>
          ) : (
            <div>
              <div className=" grid grid-cols-4 gap-4 pb-14 ">
                {movies.map((e) => (
                  <div
                    key={e.id}
                    className="w-[250px] h-[405px] bg-black rounded-[4px] overflow-hidden "
                  >
                    <div className="w-[250px] h-[280px] flex items-center justify-center">
                      {e.poster_path ? (
                        <img
                          className="w-full h-full object-cover rounded-[4px]"
                          src={`${urlImg}${e.poster_path}`}
                          alt="movie_Img"
                        />
                      ) : (
                        <span className="text-white text-sm">No Image</span>
                      )}
                    </div>

                    <div className="px-5 pb-5">
                      <div className="flex flex-col justify-between h-18">
                        <h5 className="text-xl font-semibold tracking-tight text-white dark:text-white line-clamp-2 mt-1">
                          {e.title ?? "no movie"}
                        </h5>
                      </div>

                      <div className="flex items-center mt-2.5 mb-5">
                        <div className="flex items-center space-x-1 rtl:space-x-reverse relative bottom-[362px] right-[32px]">
                          <div className="bg-blue-100 flex items-center justify-between w-[50px] h-[20px] px-1.5 text-blue-800 text-xs font-semibold  rounded-[4px] dark:bg-blue-200 dark:text-blue-800 ms-3">
                            {e.vote_average?.toFixed(1) ?? "N/A"}
                            <svg
                              className="w-4 h-4 text-red-700"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="currentColor"
                              viewBox="0 0 22 20"
                            >
                              <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                            </svg>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between px-4 w-[250px] h-[50px] relative right-[20px] bottom-[46px]">
                        <div className=" flex">
                          <div className=" border-2 w-[44px] h-[35px] flex items-center justify-center text-white border-red-300 rounded-2xl">
                            {e.original_language}
                          </div>
                          <div className=" flex items-center justify-center w-[58px] h-[35px] border-2 text-white ml-2 border-red-300 rounded-2xl">
                            {e.release_date?.slice(0, 4) ?? "N/A"}
                          </div>
                        </div>
                        <button
                          onClick={() => addToCart(e)}
                          className=" px-3 py-1 border-2 text-white ml-2 bg-red-700 rounded-2xl"
                        >
                          add cart
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-center items-center px-4 py-6 ">
                <button
                  onClick={prevPage}
                  disabled={currentPage === 1}
                  className=" text-white px-4 py-2 rounded"
                >
                  <img
                    src="./left-arrow-backup-2-svgrepo-com.svg"
                    alt=""
                    className=" w-[25px] h-[25px]"
                  />
                </button>
                <span className="text-white pr-2">
                  Page
                  <span className=" mx-2 px-4 py-2 bg-blue-500 rounded">
                    {currentPage}
                  </span>{" "}
                  of <span className=" ml-3">{totalPages}</span>
                </span>
                <button
                  onClick={nextPage}
                  disabled={currentPage === totalPages}
                  className=" text-white px-4 py-2 rounded"
                >
                  <img
                    src="./left-arrow-backup-2-svgrepo-com (1).svg"
                    alt=""
                    className=" w-[25px] h-[25px]"
                  />
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Home;
