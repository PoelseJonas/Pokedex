import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Cards from "../components/Cards";
import NavBar from "../components/Navbar";

const LIMIT = 18;

export default function Pokedex() {
  //Lagring af data:
  const [pokemon, setPokemon] = useState([]);
  //
  const [offset, setOffset] = useState(0);
  const currentPage = offset / LIMIT + 1;
  //Måske bruge UseMemo eller anden performance hook her?
  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon?limit=${LIMIT}&offset=${offset}`)
      .then((response) => response.json())
      .then((data) => setPokemon(data.results));
  }, [offset]);

  return (
    <div>
      <h1>Pokédex</h1>

      <ul className="pokemon-list">
        {pokemon.map((p) => (
          <li key={p.name}>
            <Cards name={p.name} url={p.url} />
          </li>
        ))}
      </ul>
      <div className="pagination">
        <button
          className="page-button"
          onClick={() => setOffset(offset - LIMIT)}
          disabled={offset === 0}
        >
          Previous
        </button>

        <p className="page">Page: {currentPage}</p>

        <button
          className="page-button"
          onClick={() => setOffset(offset + LIMIT)}
        >
          Next
        </button>
      </div>
    </div>
  );
}
