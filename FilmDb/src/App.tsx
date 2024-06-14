import {Route, Routes, useLocation } from 'react-router-dom';
import './App.css'
import Navigation from './components/Navigation';
import MovieDetailPage from './pages/MovieDetailPage';
import LoginPage from './pages/LoginPage';
import RegistrationPage from './pages/RegistrationPage';
import HomePage from './pages/HomePage';
import ProtectedRoute from './components/ProtectedRoute';
import BotoomNavigation from './components/BotoomNavigation';
import MovieList from './components/MovieList';
import FavoriteMoviesPage from './pages/FavoriteMoviesPage';
import AddMoviePage from './pages/AddMoviePage';




function App() {
   const location=useLocation();
   const hideNavBar=location.pathname==='/' || location.pathname==='/RegistrationPage';
  
   return (
      <>
      {!hideNavBar && <Navigation/>}
      {!hideNavBar && <BotoomNavigation/>}
      
      <Routes>
         
         <Route path='/' element={<LoginPage/>}/> 
         <Route path='/HomePage' element={<ProtectedRoute> <HomePage/> </ProtectedRoute>}/> 
         <Route path='/RegistrationPage' element={<RegistrationPage/>}/>

         <Route element={<ProtectedRoute/>}> 
            <Route path='/FavoriteMoviesPage' element={<FavoriteMoviesPage/>}/>
            <Route path='/MovieList' element={<MovieList/>}/> 
            <Route path='/MovieDetailPage/:imdbid' element={<MovieDetailPage/>}/>
            <Route path='/AddMoviePage' element={<AddMoviePage/>}/> 
         </Route>
      </Routes>

     


     </>
   

  )
}

export default App
