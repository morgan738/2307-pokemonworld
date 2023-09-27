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
    seed
  }