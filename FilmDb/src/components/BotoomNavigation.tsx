import { FilmSlate, Heart, HouseSimple, PlusCircle } from "@phosphor-icons/react"
import { Link } from "react-router-dom"
import './styles/bottomNavigation.css'

function BotoomNavigation() {
  return (
    <nav className="bottomNavigation">

<Link to="/HomePage" className="navItems">
      <div><HouseSimple size={25} /></div>
      <span>Home</span>
      </Link>

      <Link to="/MovieList" className="navItems">
      <div><FilmSlate size={25} /></div>
      <span>Movie List</span>
      </Link>

      <Link to="/AddMoviePage" className="navItems">
      <div> <PlusCircle size={25} /></div>
      <span>Add Movie</span>
      </Link>

      <Link to="/FavoriteMoviesPage" className="navItems">
      <div> <Heart size={25} /> </div>
      <span> Favorites </span>
      </Link>


    </nav>
  )
}

export default BotoomNavigation
