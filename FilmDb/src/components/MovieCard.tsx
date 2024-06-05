import Movie from '../models/Movie'
type MovieCardProps={
    movies:Movie;
}
function MovieCard({movies}:MovieCardProps) {
  return (
    <div>
       <h1> {movies.title}  </h1>
          
        {movies.imdbid}
      
    </div>
  )
}

export default MovieCard
