const express = require('express')
const router = express.Router()
const {
    client,
    fetchPokemon
} = require('./db')

router.get('/pokemons', async(req,res,next) => {
    try {
      
      res.send(await fetchPokemon())
    } catch (error) {
      next(error)
    }
  })

  router.get('/trainers', async(req,res,next) => {
    try {
      const SQL = `
        SELECT *
        FROM trainers
      `
      const response = await client.query(SQL)
      res.send(response.rows)
    } catch (error) {
      next(error)
    }
  })

  router.put('/pokemons/:id', async(req,res,next) => {
    try {
      const SQL = `
        UPDATE pokemons
        SET name = $1, trainer_id = $2
        WHERE id= $3
        RETURNING *
      `
      const response = await client.query(SQL, [req.body.name, req.body.trainer_id, req.params.id])
      res.send(response.rows[0])
    } catch (error) {
      next(error)
    }
  })


module.exports = router