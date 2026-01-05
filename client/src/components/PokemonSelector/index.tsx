import React, { ChangeEvent, useContext, useEffect, useState } from "react";
import Select from "react-select";
import usePokemonsList from "../../hooks/usePokemonList";
import useTranslate from "../../hooks/useTranslate";
import { capitalizeFirstLetter } from "../../utils/general";
import { PreferencesContext } from "../../contexts/PreferencesContext";
import ButtonNavigate from "../ButtonNavigate";

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
  const { selectedPokemonId, changeSelectedPokemonId } =
    useContext(PreferencesContext);
  const {
    isLoading,
    totalPokemonsCount,
    totalPokemonsWithPokedexCount,
    pokemonList,
  } = usePokemonsList();
  const [selectedValue, setSelectedValue] =
    useState<ReactSelectOption | null>();
  const { translate } = useTranslate();
  const [pokemonOptions, setPokemonOptions] = useState<ReactSelectOption[]>([]);
  const [pokemonFilter, setPokemonFilter] = useState("");

  const handleOnPokemonNumberChangeFromNavButtons = (
    event: ChangeEvent<HTMLInputElement>,
  ): void => {
    changeSelectedPokemonId(+event.target.value); // + casts to number
  };

  useEffect(() => {
    let pokemonOptionsMap = pokemonList.map((poke, i) => {
      return {
        value: i + 1,
        label: capitalizeFirstLetter(poke.name),
      };
    });
    setPokemonOptions(pokemonOptionsMap);
  }, [pokemonList]);

  useEffect(() => {
    if (pokemonList.length > 0) {
      debugger;
      setSelectedValue({
        value: selectedPokemonId,
        label: pokemonList.length
          ? capitalizeFirstLetter(pokemonList[selectedPokemonId - 1].name)
          : "",
      });
    }
  }, [pokemonList, selectedPokemonId]);

  return (
    <>
      <Select
        value={selectedValue}
        onChange={(event) => {
          if (event?.value) {
            changeSelectedPokemonId(event.value);
          }
        }}
        onInputChange={(textInFilter) => setPokemonFilter(textInFilter)}
        options={pokemonFilter.length >= 3 ? pokemonOptions : []}
        noOptionsMessage={() =>
          pokemonFilter.length >= 3
            ? `${translate("No results")}`
            : `${translate("Type to search")}`
        }
      />

      <div>
        <ButtonNavigate
          buttonText="<<"
          enabled={+selectedPokemonId !== 1}
          handleClick={() => changeSelectedPokemonId(1)}
        />
        <ButtonNavigate
          buttonText="<"
          enabled={+selectedPokemonId > 1}
          handleClick={() =>
            changeSelectedPokemonId(Number(selectedPokemonId) - 1)
          }
        />

        <input
          type="number"
          id="pokeid"
          name="pokeid"
          min="1"
          max={totalPokemonsWithPokedexCount}
          value={selectedPokemonId}
          onChange={handleOnPokemonNumberChangeFromNavButtons} // esto le pasa todos los argumentos de onChange como argumentos a la función handle, aunque no lo ponga en ningún sitio, porque mierdas de sugarcoating
        />
        <ButtonNavigate
          buttonText=">"
          enabled={+selectedPokemonId < totalPokemonsWithPokedexCount}
          handleClick={() =>
            changeSelectedPokemonId(Number(selectedPokemonId) + 1)
          }
        />
        <ButtonNavigate
          buttonText=">>"
          enabled={+selectedPokemonId !== totalPokemonsWithPokedexCount}
          handleClick={() =>
            changeSelectedPokemonId(totalPokemonsWithPokedexCount)
          }
        />
      </div>
    </>
  );
};
