import React, {useState} from "react";
import { Link } from "react-router-dom";
import axios from "axios";


const Pokemons = ({pokemons, setPokemons}) => {
  const [newPoke, setNewPoke] = useState('')

  const addPoke = async (ev) => {
    ev.preventDefault()
    console.log(newPoke)
    const {data} = await axios.post('/api/pokemons', {name: newPoke})
    setPokemons([...pokemons, data])
    setNewPoke('')
  }

    return (
      <div>
        <h1>All the Pokemon</h1>
        {
          pokemons.map((pokemon) => {
            return(
                <div key={pokemon.id}>
                    <Link to={`/pokemon/${pokemon.id}`}><h3 >{pokemon.name}</h3></Link>
                </div>
              
            )
          })
        }
        <hr/>
        <h1>Add Pokemon:</h1>
        <form onSubmit={addPoke}>
          <label>
            Pokemon name:
            <input type="text" onChange={ev => setNewPoke(ev.target.value)}></input>
          </label>
          <div>
            <button type="submit">Add!</button>
          </div>
        </form>
      </div>
    )
  }

export default Pokemons