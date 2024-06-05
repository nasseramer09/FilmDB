import { useEffect } from 'react';
import MovieCard from '../components/MovieCard';
import useMovieStore from '../stores/useMovieStore';
import axios from 'axios';


function MovieList() {

  const movies=useMovieStore((state)=>state.movies);
  const setMovies=useMovieStore((state)=>state.setMovies);

  useEffect(()=>{
    const getMovies = async ()=>{
      try{
        const response = await axios.get(' http://localhost:8080/api/keys');
        const apiKey=response.data.data;
        console.log(apiKey)

        const movieResponse= await axios.get(`http://localhost:8080/api/movies?key=${apiKey}`);
        setMovies(movieResponse.data.data)
        console.log('detta är movierespons',movieResponse.data.data)
      }catch(error){
        console.log(error)
      }
    };
    getMovies();
  },[setMovies])

  return (
    <div>
      
    
    {
      movies.map((movie)=>(
        <MovieCard movies={{
          imdbid: movie.imdbid,
          is_favorite: false,
          poster: movie.poster,
          title: movie.title,
          trailer_link: movie.trailer_link
        }} />
      ))
    }

    </div>
  )
}

export default MovieList
