import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./pokemonInfo.css";
function PokemonInfo() {
  const Id = useParams().id;
  const newId = Number(Id);
  const [currentId, setCurrentId] = useState(newId);
  const [data, setData] = useState({});

  const Poke_url = `https://pokeapi.co/api/v2/pokemon/${currentId}/`;

  async function PokemonResult() {
    const pokeDetails = await axios.get(Poke_url);
    const pokemon = pokeDetails.data;

    setData({
      name: pokemon.name,
      image: pokemon.sprites.other
        ? pokemon.sprites.other.dream_world.front_default
        : pokemon.sprites.other.dream_world.back_shiny,
      types: pokemon.types.map((t) => t.type.name),
      weight: pokemon.weight,
      height: pokemon.height,
    });
  }

  useEffect(() => {
    PokemonResult();
  }, [currentId]);
  return (
    <div className="pokemon-details-box">
      <div className="sub_box">
        <div>{Id}</div>
        <div className="image_box">
          <img src={data.image} alt="" />
        </div>
        <div className="details-box"> name={data.name}</div>
        <div className="details-box">weight={data.weight}</div>
        <div className="details-box">height={data.height}</div>
        <div className="details-box">other-name={data.types}</div>
        <div className="control">
          <Link to={`/pokemon/${currentId - 1}`}>
            <button
              disabled={currentId == 1}
              onClick={() => setCurrentId((setId) => setId - 1)}
            >
              previous
            </button>
          </Link>
          <Link to={`/pokemon/${currentId + 1}`}>
            <button
              disabled={currentId == 200 || currentId >= 200}
              onClick={() => setCurrentId((setId) => setId + 1)}
            >
              Next
            </button>
          </Link>
        </div>
        <div>
          <Link to="/">
            <p>All view</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
export default PokemonInfo;
