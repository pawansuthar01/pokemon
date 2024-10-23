/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function usePokemonDetails() {
  const { id } = useParams();
  const [data, setData] = useState({});

  const Poke_url = `https://pokeapi.co/api/v2/pokemon/${id}/`;

  async function PokemonResult() {
    const pokeDetails = await axios.get(Poke_url);
    const pokemon = pokeDetails.data;

    setData({
      name: pokemon.name,
      image: pokemon.sprites.other.dream_world.front_default,

      types: pokemon.types.map((t) => t.type.name),
      weight: pokemon.weight,
      height: pokemon.height,
    });
  }
  //   pokemonListHook = `https://pokeapi.co/api/v2/type/${type}/`;

  useEffect(() => {
    PokemonResult();
  }, []);
  return [data, setData];
}
export default usePokemonDetails;
