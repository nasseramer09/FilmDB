import { useParams } from "react-router-dom";
import useMovieStore from "../stores/useMovieStore"
import './styles/movieDetailPage.css'
import { Heart } from "@phosphor-icons/react";



function MovieDetailPage() {

const {imdbid}=useParams();
const movies = useMovieStore((state)=>state.movies);
const movie = movies.find((m)=>m.imdbid===imdbid);
const favoriteMovies = useMovieStore((state)=>state.favoriteMovies);
const toggleFavorite=useMovieStore((state)=>state.toggleFavorite);


const isFavorite = favoriteMovies.some((fav)=>fav.imdbid===imdbid);

if(!movie){
  return <p>No movies to se right now try again leter </p>
}

  return (
    <section className="movieDetailPage">
      <h1 className="title">{movie?.title}</h1>
      <div className="movieHeader">

        <button className="addToFavorite" onClick={()=>{if(imdbid)toggleFavorite(imdbid)}}>
          <span> {isFavorite? " Remove from favorite ": " Add To Favorite List "}  </span>
          < Heart size={25} color={isFavorite? " red ": " white "}/>
        </button>

        <img src={movie?.poster} alt={movie?.title} className="moviePoster"/>
      </div>

      <div className="movieTrailer">
        <h2>Watch trailer </h2>
        <iframe src={movie?.trailer_link}
         frameBorder="0"
         width='560'
         height='315'
         title={movie?.title}
         allow="accelerometer; autoplay; clipbord-wroter; encrypted-media; gyroscope; picture-in-picture"
         allowFullScreen
        ></iframe>
        
      </div>


    </section>
  )
}

export default MovieDetailPage
