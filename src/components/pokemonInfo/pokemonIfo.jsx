import { Link, useParams } from "react-router-dom";
import usePokemonDetails from "../../hooks/usePokemonDetails";
import "./pokemonInfo.css";
function PokemonInfo() {
  const { id } = useParams();
  const [data] = usePokemonDetails();

  return (
    <div className="pokemon-details-box">
      <div className="sub_box">
        <div>{id}</div>
        <div className="image_box">
          <img src={data.image} alt="" />
        </div>
        <div className="details-box"> name={data.name}</div>
        <div className="details-box">weight={data.weight}</div>
        <div className="details-box">height={data.height}</div>
        <div className="details-box">Type={data.types}</div>

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
