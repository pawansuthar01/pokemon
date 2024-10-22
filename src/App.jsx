import { Link } from "react-router-dom";
import "./App.css";
import ControlRouter from "./Routers/ControlsRouters";

function App() {
  return (
    <div>
      <Link to="/" className="Home-Link">
        <h1>PokeDex</h1>
      </Link>
      <ControlRouter />
    </div>
  );
}
export default App;
