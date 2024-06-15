import { useState } from "react"
import useMovieStore from "../stores/useMovieStore";
import './styles/addMoviePage.css'
import { useNavigate } from "react-router-dom";



function AddMoviePage() {
const  [title, setTitle] = useState('');
const [poster, setPoster] = useState('');
const [trailerlink, setTrailerLink] = useState('');
const addMovie = useMovieStore((state) => state.addMovie);
const navigate = useNavigate();


const handleAddMovie = async () => {
    if(title && poster && trailerlink){

        const newMovie = {
            title,
            poster,
            trailer_link : trailerlink
        };
        await addMovie(newMovie);
        
        setTitle('');
        setPoster('');
        setTrailerLink('');

        
        navigate('/MovieList')

    }else{
        console.log('Fields are not filled');
    }
};
  return (
    <section className="addMoviePage">
        <h1>Add new Movie </h1>
<div className="form"> 
        <div className="addingNewMovieForm">
            <label>Title: </label>
            <input type="text" placeholder="Enter movie title" value={title} onChange={(e)=>setTitle(e.target.value)} />
        </div>

        <div className="addingNewMovieForm">
            <label>Poster Url: </label>
            <input type="text" placeholder="Enter poster url" value={poster} onChange={(e)=>setPoster(e.target.value)} />
        </div>

        <div className="addingNewMovieForm">
            <label>Trailer-link : </label>
            <input type="text" placeholder="Enter trailer url" value={trailerlink} onChange={(e)=>setTrailerLink(e.target.value)} />
        </div>
   
        <button onClick={handleAddMovie}> Add Movie </button>
        </div>
    </section>
  )
}

export default AddMoviePage
