const pg = require('pg');
const client = new pg.Client('postgres://localhost/pokemonworld');

    const fetchPokemon = async() => {
        const SQL = `
        SELECT *
        FROM pokemons
      `
      const response = await client.query(SQL)
      return response.rows
    }

    const addPokemon = async(pokemon) => {
      const SQL = `
        INSERT INTO pokemons(name, trainer_id)
        VALUES($1, null)
        RETURNING *
      `
      const response = await client.query(SQL,[pokemon.name])
      return response.rows[0]
    }

    const addTrainer = async(trainer) => {
      const SQL = `
        INSERT INTO trainers(name)
        VALUES($1)
        RETURNING *
      `
      const response = await client.query(SQL,[trainer.name])
      return response.rows[0]
    }

    const fetchTrainers = async() => {
        const SQL = `
        SELECT *
        FROM trainers
      `
      const response = await client.query(SQL)
      return response.rows
    }

    const assignTrainer = async(pokemon) => {
        const SQL = `
        UPDATE pokemons
        SET name = $1, trainer_id = $2
        WHERE id= $3
        RETURNING *
      `
      const response = await client.query(SQL, [pokemon.name, pokemon.trainer_id, pokemon.id])
      return response.rows[0]
    }

  
  
  

  const seed = async() => {
    const SQL = `
    DROP TABLE IF EXISTS pokemons;
    DROP TABLE IF EXISTS trainers;

    CREATE TABLE trainers(
      id SERIAL PRIMARY KEY,
      name VARCHAR(255)
    );

    CREATE TABLE pokemons(
      id SERIAL PRIMARY KEY,
      name VARCHAR(255),
      trainer_id INT REFERENCES trainers(id)
    );

    INSERT INTO trainers(name) VALUES ('Ash');
    INSERT INTO trainers(name) VALUES ('Brock');
    INSERT INTO trainers(name) VALUES ('Misty');
    INSERT INTO trainers(name) VALUES ('Jessie');
    INSERT INTO trainers(name) VALUES ('James');

    INSERT INTO pokemons(name, trainer_id)
      VALUES (
        'Pikachu',
        (SELECT id FROM trainers WHERE name='Ash')
      );

      INSERT INTO pokemons(name, trainer_id)
      VALUES (
        'Geodude',
        (SELECT id FROM trainers WHERE name='Brock')
      );

      INSERT INTO pokemons(name, trainer_id)
      VALUES (
        'Starmi',
        (SELECT id FROM trainers WHERE name='Misty')
      );

      INSERT INTO pokemons(name, trainer_id)
      VALUES (
        'Togepi',
        (SELECT id FROM trainers WHERE name='Misty')
      );

      INSERT INTO pokemons(name, trainer_id)
      VALUES (
        'Lugia',
        null
      );

      INSERT INTO pokemons(name, trainer_id)
      VALUES (
        'Pidgey',
        null
      );

      INSERT INTO pokemons(name, trainer_id)
      VALUES (
        'Snorlax',
        null
      );
  `;
  await client.query(SQL)
  }

  module.exports = {
    client,
    fetchPokemon,
    fetchTrainers,
    assignTrainer,
    addPokemon,
    addTrainer,
    seed
  }