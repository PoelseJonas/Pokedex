import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function PokemonDetails() {
  const { name } = useParams();

  const [pokemon, setPokemon] = useState(null);
  const [species, setSpecies] = useState(null);

  const [evolution, setEvolution] = useState(null);
  const [evoLine, setEvoLine] = useState([]);

  //Skal bruges til at transformatere udviklingslinjen, da det er nested.
  function getEvolutionLine(chain) {
    const result = [];

    let current = chain;

    while (current) {
      result.push({
        name: current.species.name,
        url: current.species.url,
        id: current.species.url.split("/").filter(Boolean).pop(),
      });

      current = current.evolves_to[0];
    }

    return result;
  }

  //Data fetching
  useEffect(() => {
    async function fetchData() {
      try {
        // 1. Pokémon data
        const pokemonRes = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${name}`,
        );
        const pokemonData = await pokemonRes.json();
        setPokemon(pokemonData);

        // 2. Species
        const speciesRes = await fetch(
          `https://pokeapi.co/api/v2/pokemon-species/${name}`,
        );
        const speciesData = await speciesRes.json();
        setSpecies(speciesData);

        // 3. Evolution chain
        const evoRes = await fetch(speciesData.evolution_chain.url);
        const evoData = await evoRes.json();

        setEvoLine(getEvolutionLine(evoData.chain));
      } catch (error) {
        console.error("Error fetching Pokémon data:", error);
      }
    }

    fetchData();
  }, [name]);

  // Før at PokemonAPI'en vil svare er pokemon og dens art null, så hvis man loader data før dette vil lortet crashe
  if (!pokemon || !species) return <p>Loading...</p>;
  const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`;

  // hent engelsk beskrivelse
  const description = species.flavor_text_entries
    .find((entry) => entry.language.name === "en")
    ?.flavor_text.replace(/\f/g, " ") //Fjerner de der mærkelige symboler
    .replace(/\n/g, " ");

  const category = species.genera.find((g) => g.language.name === "en")?.genus;

  return (
    <div className="details">
      {/* VENSTRE */}
      <div className="left">
        <div className="image-box">
          <img src={image} alt={name} />
        </div>

        <div className="stats">
          {pokemon.stats.map((s) => (
            <div key={s.stat.name} className="stat">
              <span className="stat-name">{s.stat.name}</span>
              <div className="bar">
                <div
                  className="fill"
                  style={{ width: `${(s.base_stat / 255) * 100}%` }}
                />
              </div>
              <span className="stat-value">{s.base_stat}</span>
            </div>
          ))}
        </div>
      </div>

      {/* HØJRE*/}
      <div className="right">
        <h1 style={{ textTransform: "capitalize" }}>{name}</h1>

        <div className="info-card">
          <p>{description}</p>
          <p>
            <strong>Height:</strong> {pokemon.height / 10} m
          </p>
          <p>
            <strong>Weight:</strong> {pokemon.weight / 10} kg
          </p>
          <p style={{ textTransform: "capitalize" }}>
            <strong>Types:</strong>{" "}
            {pokemon.types.map((t) => t.type.name).join(", ")}
          </p>
          <p>
            <strong>Category:</strong> {category}
          </p>
          <p style={{ textTransform: "capitalize" }}>
            <strong>Abilities:</strong>{" "}
            {pokemon.abilities.map((a) => a.ability.name).join(", ")}
          </p>
        </div>

        <div className="evolution">
          <h3>Evolution</h3>
          <div className="evo-row">
            {evoLine.map((pokemon, index) => (
              <div key={pokemon.name} className="evo-wrapper">
                <div className="evo-item">
                  <Link to={`/pokemon/${pokemon.name}`} className="evo-card">
                    <img
                      src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
                      alt={pokemon.name}
                    />
                    </Link>
                    <p style={{ textTransform: "capitalize", color: "black" }}>
                      {pokemon.name}
                    </p>
                  {index < evoLine.length - 1 && <i className="arrow"></i>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
