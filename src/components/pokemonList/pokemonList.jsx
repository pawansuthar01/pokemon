import "./pokemonList.css";
import Pokemon from "../pokemon/pokemon";
import usePokemonList from "../../hooks/usePokemonlist";
function PokemonList() {
  const { pokemonListState, setPokemonListState } = usePokemonList();

  return (
    <>
      <div className="pokemon-box">
        <div className="pokemon">
          <input type="text" placeholder="Enter Pokemon Name" />
        </div>
        <div className="pokemon-Info">
          {pokemonListState.isLoad
            ? "loading.."
            : pokemonListState.dataList.map((p) => (
                <Pokemon name={p.name} image={p.image} id={p.id} key={p.name} />
              ))}
        </div>
        <div className="control">
          <button
            disabled={pokemonListState.previousUrl == null}
            onClick={() =>
              setPokemonListState((valueState) => ({
                ...valueState,
                pokemon_url: pokemonListState.previousUrl,
              }))
            }
          >
            previous
          </button>
          <button
            disabled={pokemonListState.nextUrl == null}
            onClick={() =>
              setPokemonListState((valueState) => ({
                ...valueState,
                pokemon_url: pokemonListState.nextUrl,
              }))
            }
          >
            next
          </button>
        </div>
      </div>
    </>
  );
}

export default PokemonList;
