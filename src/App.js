import React from 'react';
import { NavBar } from "./components/NavBar";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Movies } from "./pages/Movies";
import { CreateMovie } from './pages/CreateMovie';
import { Logout } from './pages/Logout';
import { Login } from './pages/Login';
import { RatingMovies } from './pages/RatingMovies';
import { CreateAccount } from './pages/CreateAccount';

function App() {
  return(
    <Router>
      <NavBar/>
      <Routes>
        <Route path="/" element={<Movies/>}/>
        <Route path="/create-movies" element={<CreateMovie/>}/>
        <Route path="/rating-movies" element={<RatingMovies/>}/>
        <Route path="/create-account" element={<CreateAccount/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/logout" element={<Logout/>}/>
      </Routes>
    </Router>
  );
}

export default App;
