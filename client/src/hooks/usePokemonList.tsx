import { useEffect, useState } from "react";

// En React un hook es un componente sin parte visual, sólo lógica, y sus nombres emiezan por "use"

type PokemonListUnit = {
  name: string;
  url: string;
};

type UsePokemonsList = {
  isLoading: boolean;
  totalPokemonsWithPokedexCount: number;
  totalPokemonsCount: number; // este número no coincide con totalPokemonsWithPokedexCount porque no todos los pokémons tienen su propia entrada en la PokéDex (formas especiales)
  pokemonList: PokemonListUnit[];
};

type PokeApiResponse = {
  count: number;
  next: string;
  //previous: string;
  results: PokemonListUnit[];
};

export default function usePokemonsList(): UsePokemonsList {
  const [totalPokemonsCount, setTotalPokemonsCount] = useState<number>(0);
  const [totalPokemonsWithPokedexCount, setTotalPokemonsWithPokedexCount] =
    useState<number>(151);
  const [pokemonList, setPokemonsList] = useState<PokemonListUnit[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const getPokemonsList = async () => {
      setIsLoading(true);

      // comprueba última entrada de la pokédex

      const resIndex = await fetch(
        "https://pokeapi.co/api/v2/pokemon-species?limit=1",
      );
      const dataIndex = (await resIndex.json()) as { count: number };

      setTotalPokemonsWithPokedexCount(dataIndex.count);

      // comprueba número total de pokes

      const resCount = await fetch("https://pokeapi.co/api/v2/pokemon?limit=1");
      const dataCount = (await resCount.json()) as { count: number };

      setTotalPokemonsCount(dataCount.count);

      // OJO: mira esta locura, no van a dar lo mismo porque el totalPokemonsCount es un useState y no tendrá su valor actualizado hasta el siguiente "frame"
      //console.log("total pokes API: " + totalPokemonsCount);
      //console.log("total pokes API: " + dataCount.count);

      const savedPokemonsCount = +(localStorage.getItem("pokemonsCount") ?? 0);

      const savedPokemonList: PokemonListUnit[] = JSON.parse(
        localStorage.getItem("pokemonList") || "null",
      );

      if (
        savedPokemonsCount === 0 ||
        // savedPokemonsCount !== totalPokemonsCount ||
        // OJO, totalPokemonsCount, que es un useState de React, ES CERO en este punto,
        // hasta el siguiente "frame" no se actualizaría, por eso utilizamos data.count en su lugar
        savedPokemonsCount !== dataCount.count ||
        savedPokemonList.length !== savedPokemonsCount
      ) {
        localStorage.setItem("pokemonsCount", String(dataCount.count));
        localStorage.setItem("lastPokemonListUpdate", String(Date.now()));

        //debugger;
        console.warn(
          "Descargando list de Pokémons... (esto solo debería ocurrir si es la primera vez que se ejecuta o si han añadido más pokémons a la API",
        );

        // descarga lista de todos los pokes (sólo nombres y urls) sólo si el número de pokes total no coincide con el guardado en localStorage

        let pokemons: PokemonListUnit[] = [];
        let urlNextPage = "https://pokeapi.co/api/v2/pokemon/?limit=200";

        while (urlNextPage) {
          try {
            const response = await fetch(urlNextPage);
            const dataList: PokeApiResponse = await response.json();
            pokemons.push(...dataList.results);

            await new Promise((r) => setTimeout(r, 100)); // una pequeña espera para no petar la API
            urlNextPage = dataList.next;

            if (!urlNextPage) {
              //setTotalPokemonsCount(data.count);
              setPokemonsList(pokemons);
              localStorage.setItem("pokemonList", JSON.stringify(pokemons));
            }
          } catch (e) {
            break; //salimos
          }
        }
      } else {
        setPokemonsList(savedPokemonList);
      }

      setIsLoading(false);
    };

    getPokemonsList();
  }, []);

  return {
    isLoading,
    totalPokemonsWithPokedexCount,
    totalPokemonsCount,
    pokemonList,
  };
}
