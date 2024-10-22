import { Routes, Route } from "react-router-dom";
import PokemonList from "../components/pokemonList/pokemonList";
import PokemonInfo from "../components/pokemonInfo/pokemonIfo";
function ControlRouter() {
  return (
    <Routes>
      <Route path="/" element={<PokemonList />} />
      <Route path="/pokemon/:id" element={<PokemonInfo />} />
    </Routes>
  );
}
export default ControlRouter;
