import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Cards({ name, url }) {
  // Ekstra: hent id fra URL
  const id = url.split("/")[url.split("/").length - 2];
  const [types, setTypes] = useState([]);

  const typeColors = {
    grass: "#78c850",
    fire: "#f08030",
    water: "#6890f0",
    electric: "#f8d030",
    ice: "#98d8d8",
    fighting: "#c03028",
    poison: "#a040a0",
    ground: "#e0c068",
    flying: "#a890f0",
    psychic: "#f85888",
    bug: "#a8b820",
    rock: "#b8a038",
    ghost: "#705898",
    dragon: "#7038f8",
    dark: "#705848",
    steel: "#b8b8d0",
    fairy: "#ee99ac",
    normal: "#a8a878",
  };

  //farver til kortene, med en gradient.
  const background =
    types.length === 2
      ? `linear-gradient(
        135deg,
        ${typeColors[types[0]]} 0%,
        ${typeColors[types[0]]} 45%,
        ${typeColors[types[1]]} 55%,
        ${typeColors[types[1]]} 100%
      )`
      : types.length === 1
        ? typeColors[types[0]]
        : "#eee";

  //Stort set, kør useEffect når komponenten loader og navnet ændrer sig.
  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
      .then((response) => response.json())
      .then((data) => {
        const typeList = data.types.map((types) => types.type.name);
        setTypes(typeList);
      });
  }, [name]);

  console.log(types);
  //types.join, da der kan være flere typer.
  return (
    <Link to={`/pokemon/${name}`}> 
      <div className={`pokemon-card ${types.join(" ")}`} style={{ background }}>
        <h5 className="pokemon-id">#{id}</h5>
        <img
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
          alt={name}
          style={{ width: "120px", height: "120px" }}
        />
        
        <h3 className="pokemon-name">{name}</h3>

        <div className="types">
          {types.map((t) => (
            <span key={t} className="type">
              {t}
            </span>
          ))}
        </div>

      </div>
    </Link>
  );
}
