import { Link } from 'react-router-dom';
import Movie from '../models/Movie'
import './styles/movieCard.css'
import {Heart, Trash} from "@phosphor-icons/react"
import useMovieStore from '../stores/useMovieStore';


type MovieCardProps={
    movies:Movie;
}

function MovieCard({movies}:MovieCardProps) {

  const {imdbid} = movies;
  const favoriteMovies = useMovieStore ((state)=>state.favoriteMovies);
  const toggleFavorite = useMovieStore ((state)=>state.toggleFavorite);
  const isFavorite = favoriteMovies.some((fav)=>fav.imdbid===imdbid);
  const deleteMovie = useMovieStore ((state) => state.deletMovie)
  
  return (
    <div className='movieCard'>
     
      <img className='moviePoster' src={movies.poster} alt={`movie poster of ${movies.title}`} />


      <div className="movieDetails">
        
        <h2 className='movieTitle'> {movies.title}  </h2>

       <div className="actionButtons">
       

        <button className='heartButton' onClick={ () => toggleFavorite(imdbid)}>
                < Heart  size={32} color={isFavorite?"red":"white"}/> </button>

      <button className='trashButton' onClick={ () => deleteMovie(imdbid)}>
      <Trash size={32} /> </button>
      </div>
      
       <Link to={`/MovieDetailPage/${movies.imdbid}` } > 
         <button className='favoriteButton'>Watch trailer</button>
         </Link>
      </div>
    </div>
  )
}

export default MovieCard
