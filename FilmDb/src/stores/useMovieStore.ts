import {create} from 'zustand'
import Movie from '../models/Movie';
import axios from 'axios';

type MovieStore={
   
    movies : Movie[];
    setMovies :(movies : Movie[] ) => void;
    favoriteMovies : Movie[];
    apiKey : string|null;
    toggleFavorite : (imbdbid:string) => void;
    getApiKey : () => void;
    getMovies : () => void;
    addMovie : ( movie : Omit <Movie, 'imdbid'>) => Promise <void>;
    deletMovie: (imdbid:string) => void;
}


const useMovieStore=create<MovieStore>((set, get)=>({

    movies:[],
    favoriteMovies:[],
    apiKey:null,
    setMovies:(movies)=>set ({movies}),


    toggleFavorite : (imdbid) => set ((state) => {
        const isFavorite= state.favoriteMovies.some((movie) => movie.imdbid === imdbid);
        const updateFavorites=isFavorite
        ? state.favoriteMovies.filter((movie) => movie.imdbid !== imdbid)
        :[...state.favoriteMovies, state.movies.find( (movie)=>movie.imdbid === imdbid)].filter(Boolean) as Movie[];
        return {favoriteMovies:updateFavorites};
    }),

    getApiKey: async() => {
        try{
           const reponse = await axios.get('http://localhost:8080/api/keys');
           const apiKey = reponse.data.data;
           set({apiKey});
           console.log('api key is ',apiKey)
        }catch(error){
            console.log('Error fetching apikey', error);
        }
    },
     getMovies: async () => {
        try{

            const  state = get();
            if(!state.apiKey){
                await state.getApiKey();
            }
            const movieResponse = await axios.get(`http://localhost:8080/api/movies?key=${state.apiKey}`);
            set({ movies : movieResponse.data.data})
            console.log(movieResponse.data.data)
        }catch(error){
            console.log('Error fetching movies',error)
        }
     },

     addMovie:async (movie)=>{
        try{
            const state=get();
            if(!state.apiKey){
                await state.getApiKey();
            }

            const response = await axios.post(`http://localhost:8080/api/movies?key=${state.apiKey}`, movie);
            const newlyAddMovie = response.data.data;
            set((state) => ( {movies : [...state.movies, newlyAddMovie] }));
            console.log(newlyAddMovie)
        }catch(error){
            console.log('Error adding new movie ' , error)
        }
     },

     deletMovie : async (imdbid)=>{
        const state = get();
        if(!state.apiKey){
            await state.getApiKey();
        }

        try{

            await axios.delete(`http://localhost:8080/api/movies/${imdbid}?key=${state.apiKey}`);
            set((state)=>({
                movies: state.movies.filter((movie) => movie.imdbid !== imdbid),
                favoriteMovies:state.favoriteMovies.filter((movie) => movie.imdbid !== imdbid),
            }));
        }catch(error){
            console.log('Error deleting movie', error)
        }
     }

   
  

}))

export default useMovieStore