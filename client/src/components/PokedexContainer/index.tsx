import React, { useEffect, useState, ChangeEvent } from "react";
import "./style.css";
import PokemonNameAndDescription from "../PokemonNameAndDescription";
import PokemonsCount from "../PokemonsCount";

type PokeApiBasicResponse = {
  name: string;
  cries: {
    legacy?: string;
    latest?: string;
  };
  sprites: {
    front_female?: string;
    front_default: string;
  };
};

type PokeApiSpeciesResponse = {
  varieties: {
    pokemon: {
      name: string;
    };
  }[];
  flavor_text_entries: {
    language: {
      name: string;
    };
    flavor_text: string;
  }[];
};

export default function PokedexContainer(): JSX.Element {
  const [pokemonNumber, setPokemonNumber] = useState<number | "">(25);
  const [pokemonName, setPokemonName] = useState<string>("");
  const [pokemonSpeciesName, setPokemonSpeciesName] = useState<string>("");
  const [pokemonDescription, setPokemonDescription] = useState<string>("");
  const [pokemonCry, setPokemonCry] = useState<string>("");
  const [pokemonSprite, setPokemonSprite] = useState<string>("");

  const handleOnPokemonNumberChange = (
    event: ChangeEvent<HTMLInputElement>,
  ): void => {
    setPokemonNumber(+event.target.value); // + casts to number
  };

  useEffect(() => {
    /*
    (async () => {
      const res = await fetch(
        "https://pokeapi.co/api/v2/pokemon/" + pokemonNumber
      );
      const data: PokeApiBasicResponse = await res.json();
      setPokemonName(data.name);
      setPokemonCry(data.cries.legacy ?? data.cries.latest ?? "");
      setPokemonSprite(data.sprites.front_female ?? data.sprites.front_default);
      console.log(data.cries);

    })();
    */

    const getPokemonBasics = async () => {
      const res = await fetch(
        "https://pokeapi.co/api/v2/pokemon/" + pokemonNumber,
      );

      //await new Promise(r => setTimeout(r, 4000));

      const data: PokeApiBasicResponse = await res.json();

      setPokemonName(data.name);
      setPokemonCry(data.cries.legacy ?? data.cries.latest ?? "");
      setPokemonSprite(data.sprites.front_female ?? data.sprites.front_default);
    };

    const getPokemonSpecies = async () => {
      const res = await fetch(
        "https://pokeapi.co/api/v2/pokemon-species/" + pokemonNumber,
      );

      await new Promise((r) => setTimeout(r, 2000));

      const data: PokeApiSpeciesResponse = await res.json();

      let description = data.flavor_text_entries.find((x) => {
        return x.language.name === "es";
      });

      if (!description) {
        description = data.flavor_text_entries.find((x) => {
          return x.language.name === "en";
        });
      }

      setPokemonSpeciesName(data.varieties[0].pokemon.name);
      /*
      if (description) {
        setPokemonDescription(description.flavor_text);
      }
      else {
        setPokemonDescription("Not found");
      }
      */
      setPokemonDescription(description?.flavor_text ?? "not found");
    };

    setPokemonName("");
    setPokemonSpeciesName("");
    setPokemonDescription("");
    setPokemonSprite("");
    setPokemonCry("");

    if (pokemonNumber !== "") {
      getPokemonBasics();
      getPokemonSpecies();
    }
  }, [pokemonNumber]);

  {
    /*
  // Cuando hay '=>' es una variable con una función, lo que hay a la izquierda son argumentos, y a la derecha la lógica
  const handleOnPokemonNumberChange = (event) => {
    setPokemonNumber(+event.target.value) // + castea a number
  }
  // Esto es lo mismo que lo anterior, y ambas son lo mismo que la anónima que hay en el onChange del input
  function handleOnPokemonNumberChange2(event) {
    setPokemonNumber(+event.target.value) // + castea a number
  }
  */
  }

  return (
    <div className="pokedex-container">
      <h1>Pokedex</h1>

      {/*
      <input type="number" id="pokeid" name="pokeid" min="1" max="10000" value={pokemonNumber}
      onChange={(event) => {
        setPokemonNumber(+event.target.value) // + castea a number
      }}
      />
      */}

      <input
        type="number"
        id="pokeid"
        name="pokeid"
        min="1"
        max="10000"
        value={pokemonNumber}
        onChange={handleOnPokemonNumberChange} // esto le pasa todos los argumentos de onChange como argumentos a la función handle, aunque no lo ponga en ningún sitio, porque mierdas de sugarcoating
      />

      {/*
      <div className="pokemon-name">{pokemonName}</div>
      {
        pokemonDescription && pokemonName
          ? <div className="pokemon-description">{pokemonDescription}</div>
          : <p>loading</p>
      }
      */}

      {
        <PokemonNameAndDescription
          name={pokemonName}
          description={
            pokemonName === pokemonSpeciesName ? pokemonDescription : "Loading"
          }
        />
      }

      <audio key={pokemonCry} autoPlay>
        <source src={pokemonCry} type="audio/ogg"></source>
      </audio>

      <div>
        <img src={pokemonSprite} alt={pokemonName}></img>
      </div>

      <div>
        <button onClick={() => setPokemonNumber("")}>Limpiar</button>
        <button onClick={() => setPokemonNumber(25)}>Pikachu</button>
      </div>

      {<PokemonsCount />}
    </div>
  );
}
