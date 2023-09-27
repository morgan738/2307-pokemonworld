import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom/client';
import axios from 'axios';
import { HashRouter, Link, Routes, Route } from 'react-router-dom';
import Pokemons from './Pokemons';
import Trainers from './Trainers';
import Pokemon from './Pokemon';
import Trainer from './Trainer';

const App = ()=> {
  const [pokemons, setPokemons] = useState([])
  const [trainers, setTrainers] = useState([])

  useEffect(() => {
    const fetchPokemon = async () => {
      const {data} = await axios.get('/api/pokemons')
      setPokemons(data)
    }
    fetchPokemon()
  },[])
  useEffect(() => {
    const fetchTrainers = async () => {
      const {data} = await axios.get('/api/trainers')
      setTrainers(data)
    }
    fetchTrainers()
  },[])



  return (
    <div>
      <h1>Pokemon World</h1>

      <nav>
        <Link to='/pokemon'><h1>All Pokemon</h1></Link>
        <Link to='/trainers'><h1>All Trainers</h1></Link>
      </nav>

      <Routes>
        <Route path='/pokemon' element={<Pokemons pokemons={pokemons}/>} />
        <Route path='/trainers' element={<Trainers trainers={trainers} />}/>
        <Route path='/pokemon/:id' element={<Pokemon pokemons={pokemons} trainers={trainers}/>}/>
        <Route path='/trainers/:id' element={<Trainer trainers={trainers} pokemons={pokemons}/>}/>
      </Routes>
    </div>
  );
};

const root = ReactDOM.createRoot(document.querySelector('#root'));
root.render(
    <HashRouter>
      <App />
    </HashRouter>
  );
