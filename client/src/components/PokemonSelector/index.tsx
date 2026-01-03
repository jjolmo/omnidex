import React, { useEffect, useState } from "react";
import Select from "react-select";
import usePokemonsList from "../../hooks/usePokemonList";

/*
const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];
 */

type ReactSelectOption = {
  value: number;
  label: string;
};

export const PokemonSelector = () => {
  const { isLoading, pokemonList } = usePokemonsList();
  const [pokemonOptions, setPokemonOptions] = useState<ReactSelectOption[]>([]);

  useEffect(() => {
    let pokemonOptionsMap = pokemonList.map((poke, i) => {
      return {
        value: i + 1,
        label: poke.name,
      };
    });
    setPokemonOptions(pokemonOptionsMap);
  }, [pokemonList]); // cuando cambie pokémon list, se ejecuta el useEffect

  return <Select options={pokemonOptions} />;
};

/* esto es lo mismo que lo de antes
export default function PokemonSelector() {
  return <Select options={options} />;
}
*/
