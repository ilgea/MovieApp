import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Button } from "flowbite-react";
import VideoSection from "../components/VideoSection";

// ana sayfada göstereceğimiz api'de bütün detaylar yer almaz.(tüm detayları çekmeyiz) api'ye yük getirir.
// detail'de ayrıca detail'i içerien farklı api tasarlanır. her sayfaya ayrı api tasarlanır.

//! url'deki id'yi useParam() (router içinde) ile yakalarız.

const MovieDetail = () => {
  const [movieDetails, setMovieDetails] = useState(""); // array olarak değil, tek bir data olarak gelecek.
  const [videoKey, setVideoKey] = useState();
  const [videoName, setVideoName] = useState();
  const navigate = useNavigate();

  const { id } = useParams();
  const API_KEY = import.meta.env.VITE_TMBD_API_KEY;

  const {
    title,
    overview,
    poster_path,
    vote_average,
    vote_count,
    release_date,
  } = movieDetails;

  const videoUrl = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}`;

  // movieDetailBaseUrl -> id'ye göre detayları çekmek için kullanacağımız api
  const movieDetailBaseUrl = `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`;
  const baseImageUrl = "https://image.tmdb.org/t/p/w1280";
  const defaultImage =
    "https://images.unsplash.com/photo-1581905764498-f1b60bae941a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=80";

  useEffect(() => {
    axios
      .get(movieDetailBaseUrl)
      .then((res) => setMovieDetails(res.data))
      .catch((err) => console.log(err));
    axios.get(videoUrl).then((res) => {
      const video = res.data.results[0];
      setVideoKey(video.key);
      setVideoName(video.name);
    });
  }, [movieDetailBaseUrl, videoUrl]);

  return (
    <div className="container px-4 mx-auto py-5 rounded-lg ">
      <h1 className="text-center text-white text-3xl mb-4 font-bold">
        {title}
      </h1>
      {videoKey && <VideoSection videoKey={videoKey} videoName={videoName} />}
      <div className="container flex justify-center ">
        <div className="flex flex-col lg:flex-row max-w-5xl rounded-lg bg-gray-100 dark:shadow-white shadow-lg">
          <img
            className=" lg:w-1/3 object-cover rounded-t-lg md:rounded-none md:rounded-l-lg"
            src={poster_path ? baseImageUrl + poster_path : defaultImage}
            alt="poster"
          />
          <div className="p-6 flex flex-col justify-between dark:bg-[#38393f] ">
            <div>
              <h5 className="text-gray-900 dark:text-white text-xl font-bold mb-2 ">
                Overview
              </h5>
              <p className="text-gray-700 text-base mb-4 dark:text-white ">
                {overview}
              </p>
            </div>
            <ul className="bg-gray-100 rounded-lg border border-gray-400  dark:border dark:border-fuchsia-900 text-gray-900">
              <li className="px-6 py-2 border-b border-gray-400 dark:border-b dark:border-fuchsia-900 w-full  dark:bg-[#575861] dark:text-white">
                {"Release Date : " + release_date}
              </li>
              <li className="px-6 py-2 border-b border-gray-400 dark:border-b dark:border-fuchsia-900 w-full dark:bg-[#575861] dark:text-white">
                {"Rate : " + vote_average}
              </li>
              <li className="px-6 py-2 border-b border-gray-400 dark:border-b dark:border-fuchsia-900 w-full dark:bg-[#575861] dark:text-white">
                {"Total Vote : " + vote_count}
              </li>
              <li className="px-6 py-2 border-gray-400 dark:border-b dark:border-fuchsia-900 w-full  dark:bg-[#575861] dark:text-white">
                <Button
                  outline
                  gradientDuoTone="purpleToPink"
                  onClick={() => navigate(-1)}
                >
                  Go Back
                </Button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
