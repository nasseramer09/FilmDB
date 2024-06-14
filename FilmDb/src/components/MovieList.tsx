import { useEffect } from 'react';
import MovieCard from '../components/MovieCard';
import useMovieStore from '../stores/useMovieStore';
import './styles/movieList.css'


function MovieList() {

  const movies = useMovieStore((state) => state.movies);
  const getMovies = useMovieStore((state) => state.getMovies);

  useEffect(()=>{
    getMovies();
  },[getMovies]);

  return (<section className="movieListContainer">
   <h1 className='movieListName'>Movie List</h1>  
   <div className='movieGridList'> 
    <> {
     movies.map((movie)=>(
        
        <MovieCard key={movie.imdbid} movies={{
          imdbid: movie.imdbid,
          is_favorite: false,
          poster: movie.poster,
          title: movie.title,
          trailer_link: movie.trailer_link
        }} />
      ))
    }
    <h1>{movies.length}</h1>
</> 
    </div>

  </section>

  )
}

export default MovieList
