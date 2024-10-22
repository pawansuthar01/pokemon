import { Link } from "react-router-dom";
import "./pokemon.css";

function Pokemon({ name, image, id }) {
  return (
    <Link to={`/pokemon/${id}`} className="Link">
      <div className="container">
        <div className="pokemon_name"> {name}</div>
        <div>
          <img className="pokemon_image" src={image} alt="" />
        </div>
      </div>
    </Link>
  );
}
export default Pokemon;
