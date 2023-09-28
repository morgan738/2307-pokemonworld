import React, {useState} from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Trainers = ({trainers, setTrainers}) => {
  const [newTrainer, setNewTrainer] = useState('')

  const addTrainer = async(ev) => {
    ev.preventDefault()
    console.log(newTrainer)
    const {data} = await axios.post('/api/trainers', {name: newTrainer})
    setTrainers([...trainers, data])
    setNewTrainer('')
  }

    return (
      <div>
        <h1>All the Trainers</h1>
        {
          trainers.map((trainer) => {
            return(
                <div key={trainer.id}>
                    <Link to={`/trainers/${trainer.id}`}> <h3 >{trainer.name}</h3></Link>
                </div>
             
            )
          })
        }
        <hr/>
        <h1>Add Trainer</h1>
        <form onSubmit={addTrainer}>
        <label>
            Trainer name:
            <input type="text" onChange={ev => setNewTrainer(ev.target.value)}></input>
          </label>
          <div>
            <button type="submit">Add!</button>
          </div>
        </form>
      </div>
    )
  }

  export default Trainers