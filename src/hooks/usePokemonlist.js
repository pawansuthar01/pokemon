import axios from "axios";
import { useEffect, useState } from "react";

function usePokemonList() {
  const [pokemonListState, setPokemonListState] = useState({
    previousUrl: "",
    nextUrl: "",
    isLoad: true,
    dataList: [],
    pokemon_url: "https://pokeapi.co/api/v2/pokemon",
  });
  async function downloadPokemon() {
    setPokemonListState((valueState) => ({ ...valueState, isLoad: true }));
    const responses = await axios.get(pokemonListState.pokemon_url);

    const pokemonResult = responses.data.results;
    setPokemonListState((valueState) => ({
      ...valueState,
      nextUrl: responses.data.next,
      previousUrl: responses.data.previous,
    }));

    const pokemonResultsPromise = pokemonResult.map((pokemon) =>
      axios.get(pokemon.url)
    );
    const pokemonData = await axios.all(pokemonResultsPromise);
    const pokemonListData = pokemonData.map((pokeData) => {
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

    setPokemonListState((valueState) => ({
      ...valueState,
      dataList: pokemonListData,
      isLoad: false,
    }));
  }

  useEffect(() => {
    downloadPokemon();
  }, [pokemonListState.pokemon_url]);

  return { pokemonListState, setPokemonListState };
}
export default usePokemonList;
