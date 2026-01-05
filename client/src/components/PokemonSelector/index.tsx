import React, { ChangeEvent, useContext, useEffect, useState } from "react";
import Select from "react-select";
import usePokemonsList from "../../hooks/usePokemonList";
import useTranslate from "../../hooks/useTranslate";
import { capitalizeFirstLetter } from "../../utils/general";
import { PreferencesContext } from "../../contexts/PreferencesContext";
import ButtonNavigate from "../ButtonNavigate";
import { useParams, useNavigate } from "react-router";
import { debug } from "node:util";

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
  const navigate = useNavigate();

  let { pokeId } = useParams();

  const handleOnPokemonNumberChangeFromInputField = (
    event: ChangeEvent<HTMLInputElement>,
  ): void => {
    //changeSelectedPokemonId(+event.target.value); // + casts to number
    navigatePokemon(+event.target.value);
  };

  const navigatePokemon = (id: number): void => {
    //changeSelectedPokemonId(id);
    if (id !== selectedPokemonId) {
      changeSelectedPokemonId(id);
    }
    navigate(`/pokemon/${id}`, { replace: true });
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
    console.log(pokeId);
    if (pokemonList.length > 0) {
      let finalSelectedId: number = pokeId ? +pokeId : 0;
      if (
        +finalSelectedId < 1 ||
        +finalSelectedId >= totalPokemonsWithPokedexCount
      ) {
        finalSelectedId = selectedPokemonId;
      }

      setSelectedValue({
        value: +finalSelectedId,
        label: pokemonList.length
          ? capitalizeFirstLetter(pokemonList[selectedPokemonId - 1].name)
          : "",
      });

      navigatePokemon(finalSelectedId);
    }
  }, [pokemonList, pokeId]);

  return (
    <>
      <Select
        value={selectedValue}
        onChange={(event) => {
          if (event?.value) {
            //changeSelectedPokemonId(event.value);
            navigatePokemon(event.value);
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
          //handleClick={() => changeSelectedPokemonId(1)}
          handleClick={() => navigatePokemon(1)}
        />
        <ButtonNavigate
          buttonText="<"
          enabled={+selectedPokemonId > 1}
          handleClick={() =>
            //changeSelectedPokemonId(Number(selectedPokemonId) - 1)
            navigatePokemon(Number(selectedPokemonId) - 1)
          }
        />

        <input
          type="number"
          id="pokeid"
          name="pokeid"
          min="1"
          max={totalPokemonsWithPokedexCount}
          value={selectedPokemonId}
          onChange={handleOnPokemonNumberChangeFromInputField} // esto le pasa todos los argumentos de onChange como argumentos a la función handle, aunque no lo ponga en ningún sitio, porque mierdas de sugarcoating
        />
        <ButtonNavigate
          buttonText=">"
          enabled={+selectedPokemonId < totalPokemonsWithPokedexCount}
          handleClick={() =>
            //changeSelectedPokemonId(Number(selectedPokemonId) + 1)
            navigatePokemon(Number(selectedPokemonId) + 1)
          }
        />
        <ButtonNavigate
          buttonText=">>"
          enabled={+selectedPokemonId !== totalPokemonsWithPokedexCount}
          handleClick={() =>
            //changeSelectedPokemonId(totalPokemonsWithPokedexCount)
            navigatePokemon(totalPokemonsWithPokedexCount)
          }
        />
      </div>
    </>
  );
};
