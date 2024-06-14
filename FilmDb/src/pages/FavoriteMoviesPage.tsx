import MovieCard from "../components/MovieCard";
import useMovieStore from "../stores/useMovieStore";
import './styles/favoriteMoviesPage.css'

function FavoriteMoviesPage() {

    const favoriteMovies = useMovieStore((state)=>state.favoriteMovies);

    return (
    <section className="favoritePage">
      <h1>Favorite Movies </h1>
      {favoriteMovies.length>0?(
      <div className="movieGrid">
        {favoriteMovies.map((movie)=>(<MovieCard key={movie.imdbid} movies={movie}/>
    
    ))}
      </div>):(
                <p className="noFavoMessage">No Favorite movies yet. <br /> Browse movies to find your favorites and mark them as favorite.</p>

    )}
    </section>
  )
}

export default FavoriteMoviesPage
