import React, { useEffect, ChangeEvent } from "react";
import './style.css';

interface PokemonData {
  name: string;
  cries: {
    legacy?: string;
    latest?: string;
  };
  sprites: {
    front_female?: string;
    front_default: string;
  };
}

export default function PokedexContainer(): JSX.Element {
  const [pokemonNumber, setPokemonNumber] = React.useState<number>(25);
  const [pokemonName, setPokemonName] = React.useState<string>("");
  const [pokemonCry, setPokemonCry] = React.useState<string>("");
  const [pokemonSprite, setPokemonSprite] = React.useState<string>("");

  const handleOnPokemonNumberChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setPokemonNumber(+event.target.value); // + castea a number
  };

  useEffect(() => {
    (async () => {
      const res = await fetch(
        "https://pokeapi.co/api/v2/pokemon/" + pokemonNumber
      );
      const data: PokemonData = await res.json();
      setPokemonName(data.name);
      setPokemonCry(data.cries.legacy ?? data.cries.latest ?? "");
      setPokemonSprite(data.sprites.front_female ?? data.sprites.front_default);
      console.log(data.cries);
    })();
  }, [pokemonNumber]);

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

      <div className="pokemon-name">{pokemonName}</div>
      <audio key={pokemonCry} autoPlay>
        <source src={pokemonCry} type="audio/ogg"></source>
      </audio>

      <div>
        <img src={pokemonSprite} alt={pokemonName}></img>
      </div>
    </div>
  );
}

