import useMovieStore from "../stores/useMovieStore";
import Slider from 'react-slick'
import './styles/homePage.css'
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';



type HomePageUserProps={
  username : string;
  password : string;
}

function HomePage(){

  const movies = useMovieStore((state) => state.movies);

  const navigate = useNavigate();

  const favoriteMovies = useMovieStore((state) => state.favoriteMovies);

  const [user, setUser] = useState< HomePageUserProps | null > (null);

  const carouselSettings = {

    dots:true,
    infinite:true,
    speed:500,
    slidesToShow:3,
    slideToScroll:1,
    responsive:[
      {
        breakpoint:500,
       settings:{  
            
        slidesToShow:2,
        slidesToScroll:1
      },
      },
      {
        breakpoint:375,
       settings:{  
            
        slidesToShow:1,
        slidesToScroll:1
      },
      },
    ]
  }

  useEffect(()=>{
    const userData = sessionStorage.getItem('user')

    if(userData){
      try{

        const parseUserData : HomePageUserProps = JSON.parse(userData);

        console.log('user data from homepage', parseUserData)

        setUser(parseUserData);

      }catch(error){
        console.log('error parsing user data in homepage', error)
      }
    }

  },[])

  const buttonOnClickHandler=()=>{
    navigate('/MovieList')
  };

  if(!user){
    return <div>Please log in </div>
  }
  return (
    <section className="homePage">
      <h2>  Welcome { user.username}  </h2>
      <div className="cardsWrapper">
        
        <p>
          
        
              Your Ultimate Movie Streaming App <br />
              Discover, Watch trailers, add new movies to list, add movies to favorite and enjoy 
        </p>
        <h3>For you</h3>
        <Slider {...carouselSettings}>
          
          {movies.slice(0,4).map((movie)=>(
            <div key={movie.imdbid} className="moviepreview">
              <img src={movie.poster} alt={movie.title} />
              <h4>{movie.title}</h4>

            </div>
          ))}


        </Slider>
        <button onClick={buttonOnClickHandler}>Se more</button>
      </div>

      <div className="favoriteMovieSection">
        <h3>Your Favorite Movies </h3>
        {favoriteMovies.length >0?(
    
        <Slider {...carouselSettings}>
          
          {favoriteMovies.map((movie)=>(
            <div key={movie.imdbid} className="moviepreview">
              <img src={movie.poster} alt={movie.title} />
              <h4>{movie.title}</h4>

            </div>
          ))}
        </Slider>):(
          <p>No Favorite movies yet. <br /> Browse movies to find your favorites and mark them as favorite.</p>)}
      </div>
    </section>
  )
}

export default HomePage;
