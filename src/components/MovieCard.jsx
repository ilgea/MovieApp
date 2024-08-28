import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContextProvider";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

// aşağıdaki url'nin üzerine poster_path'i eklediğimizde image'leri elde ediyoruz.
const IMG_API = `https://image.tmdb.org/t/p/w1280`;
const defaultImage = `https://images.unsplash.com/photo-1581905764498-f1b60bae941a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=80`;

const MovieCard = ({ poster_path, title, overview, vote_average, id }) => {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const maxLength = 100;

  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength);
    }
    return text;
  };

  const getVoteClass = (vote) => {
    if (vote >= 8) {
      return "green";
    } else if (vote >= 6) {
      return "orange";
    } else {
      return "red";
    }
  };

  return (
    <div
      className="movie "
      onClick={() => {
        navigate("details/" + id);
        !currentUser &&
          toast("Please Login", {
            icon: "🔒",
          });
      }}
    >
      <img
        loading="lazy"
        src={poster_path ? IMG_API + poster_path : defaultImage}
        alt="movie-card"
      />
      <div className="flex align-baseline items-center justify-between py-1 px-2  text-white ">
        <h5 className="">{title}</h5>
        {currentUser && (
          <span className={`tag ${getVoteClass(vote_average)}`}>
            {vote_average.toFixed(1)}
          </span>
        )}
      </div>
      <div className="movie-over">
        <h2 className="font-bold">Overview</h2>
        <p className="movie-over--info after:content-['...'] after:tracking-[2px] after:text-2xl after:leading-none">
          {truncateText(overview, maxLength)}
        </p>
      </div>
    </div>
  );
};

export default MovieCard;
