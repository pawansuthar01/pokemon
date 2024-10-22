/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import "./pokemonList.css";
import axios from "axios";
import Pokemon from "../pokemon/pokemon";
function PokemonList() {
  const [previous, setPrevious] = useState("");
  const [next, setNext] = useState("");
  const [list, setList] = useState([]);
  const [load, setload] = useState(true);
  const [pokemon_url, setPokemon_url] = useState(
    "https://pokeapi.co/api/v2/pokemon"
  );

  async function downloadPokemon() {
    setload(true);
    const responses = await axios.get(pokemon_url);

    const pokemonResult = responses.data.results;
    setNext(responses.data.next);
    setPrevious(responses.data.previous);

    const pokemonResultsPromise = pokemonResult.map((pokemon) =>
      axios.get(pokemon.url)
    );
    const pokemonData = await axios.all(pokemonResultsPromise);
    const res = pokemonData.map((pokeData) => {
      const pokemon = pokeData.data;
      return {
        id: pokemon.id,
        name: pokemon.name,
        image: pokemon.sprites.other
          ? pokemon.sprites.other.dream_world.front_default
          : pokemon.sprites.other.dream_world.back_shiny,
        type: pokemon.types,
      };
    });

    setList(res);
    setload(false);
  }
  useEffect(() => {
    downloadPokemon();
  }, [pokemon_url]);

  return (
    <>
      <div className="pokemon-box">
        <div className="pokemon">
          <input type="text" placeholder="Enter Pokemon Name" />
        </div>
        <div className="pokemon-Info">
          {load
            ? "loading.."
            : list.map((p) => (
                <Pokemon name={p.name} image={p.image} id={p.id} key={p.name} />
              ))}
        </div>
        <div className="control">
          <button
            disabled={previous == null}
            onClick={() => setPokemon_url(previous)}
          >
            previous
          </button>
          <button disabled={next == null} onClick={() => setPokemon_url(next)}>
            next
          </button>
        </div>
      </div>
    </>
  );
}

export default PokemonList;
