import React from 'react';
import { NavBar } from "./components/NavBar";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Movies } from "./pages/Movies";
import { Home } from './pages/Home';
import { CreateMovie } from './pages/CreateMovie';
import { Logout } from './pages/Logout';
import { Login } from './pages/Login';

function App() {
  return(
    <Router>
      <NavBar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/movies" element={<Movies/>}/>
        <Route path="/create-movies" element={<CreateMovie/>}/>
        <Route path="/logout" element={<Logout/>}/>
        <Route path="/login" element={<Login/>}/>
      </Routes>
    </Router>
  );
}

export default App;
