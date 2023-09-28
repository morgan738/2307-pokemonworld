import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom/client';
import axios from 'axios';
import { HashRouter, Link, Routes, Route } from 'react-router-dom';
import Pokemons from './Pokemons';
import Trainers from './Trainers';
import Pokemon from './Pokemon';
import Trainer from './Trainer';
import Assign from './Assign';

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

  const assignTrainer = async(trainerId, pokemonId) => {
    console.log(trainerId, pokemonId)
    const chosenPoke = pokemons.find((poke) => {
      return pokemonId == poke.id
    })
    const updatedPoke = {...chosenPoke, trainer_id: trainerId}
    console.log(updatedPoke)

    const response = await axios.put(`/api/pokemons/${updatedPoke.id}`, updatedPoke)
    const pokemon = response.data
    setPokemons(pokemons.map(poke => poke.id === pokemon.id ? pokemon : poke))
  }

  const unAssignTrainer = async(pokemonId) => {
    const chosenPoke = pokemons.find((poke) => {
      return pokemonId == poke.id
    })
    const updatedPoke = {...chosenPoke, trainer_id: null}
    console.log(updatedPoke)
    const response = await axios.put(`/api/pokemons/${updatedPoke.id}`, updatedPoke)
    const pokemon = response.data
    setPokemons(pokemons.map(poke => poke.id === pokemon.id ? pokemon : poke))

  }



  return (
    <div>
      <h1>Pokemon World</h1>

      <nav>
        <Link to='/pokemon'><h1>All Pokemon</h1></Link>
        <Link to='/trainers'><h1>All Trainers</h1></Link>
        <Link to='/assign'><h1>Assign</h1></Link>
      </nav>

      <Routes>
        <Route path='/pokemon' element={<Pokemons pokemons={pokemons} setPokemons={setPokemons}/>} />
        <Route path='/trainers' element={<Trainers trainers={trainers} setTrainers={setTrainers} />}/>
        <Route path='/assign' element={<Assign pokemons={pokemons} trainers={trainers} assignTrainer={assignTrainer} unAssignTrainer={unAssignTrainer}/>}/>
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
