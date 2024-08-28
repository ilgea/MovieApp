import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import MovieCard from "../components/MovieCard";
import { AuthContext } from "../context/AuthContextProvider";
import toast from "react-hot-toast";
// movie data'larını sadece main page'de kullanağımız için global state'de tutmadık.

const Main = () => {
  const API_KEY = import.meta.env.VITE_TMBD_API_KEY;
  // FEATURED_API -> ana sinema verilerini çekmek için kullanacağız
  const FEATURED_API = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}`;
  // SEARCH_API -> search için kullanılacak api
  const SEARCH_API = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=`;

  // movie'lerimizi tutacağımız state'leri ayarlayalım.
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const { currentUser } = useContext(AuthContext);

  // açılışta tek seferlik çalışması için.
  useEffect(() => {
    getMovies(FEATURED_API);
  }, []);

  // bu fonk. ayrı ayrı yazmak yerine, hangi api'yi gönderirsek ondan data'yı çekeceğiz
  const getMovies = async (API) => {
    setLoading(true);
    try {
      const { data } = await axios.get(API);
      setMovies(data.results);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (searchTerm && currentUser) {
      getMovies(SEARCH_API + searchTerm);
      // value olmazsa sıfırlama olmaz.
      //! burada bir value'ya bağlarsak kontrollü komponent oluyor.
      // yani bir state'e bağlı olarak bu input'u kontrol ediyoruz.
      setSearchTerm("");
    } else if (!currentUser) {
      toast("Please Login", {
        icon: "🔒",
      });
    } else {
      toast("Lütfen aramak istediğiniz filmi giriniz.", {
        icon: "🎬",
        style: {
          color: "#fff",
          paddingRight: "5px",
        },
      });
    }
  };

  // {...movie} -> her bir elemanı ayrı ayrı gönderiyoruz ki, ilgili componentten dest. edip yakalayabilelim.
  // movie={movie} -> dediğimizde, ilk önce movie'yi dest. etmemiz lazım. Yani 2 kez dest. yapmamız gerekiyor.
  return (
    <>
      {/* form içinde yazmamızın en büyük avantajı, enter tuşu için ayrıca bir fonk. yazmamıza gerek kalmıyor */}
      {/* type="search" -> yazmaya başladığımızda kenarda  silme (x şeklinde) işareti çıkarıyor. */}
      <form className="flex justify-center p-2 " onSubmit={handleSubmit}>
        <input
          type="search"
          className="w-80 h-8 rounded-md outline-none border p-1 m-2  "
          placeholder="Search a movie..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="text-white" type="submit">
          Search
        </button>
      </form>
      {/* flex-wrap -> küçültüp büyülttükçe taşmalar aşağıya kayması için */}
      <div className="flex justify-center mx-auto flex-wrap ">
        {/* loading true ise bize loading state'i göster, false ise verileri göster */}

        {loading ? (
          <div
            className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-blue-600 mt-52"
            role="status"
          >
            <span className="visually-hidden">Loading...</span>
          </div>
        ) : (
          movies.map((movie) => <MovieCard key={movie.id} {...movie} />)
        )}
      </div>
    </>
  );
};

export default Main;
