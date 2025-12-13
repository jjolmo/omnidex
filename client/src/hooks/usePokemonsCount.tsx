import React, { useEffect, useState } from "react";

// En React un hook es un componente sin parte visual, sólo lógica, y sus nombres emiezan por "use"

type UsePokemonsCount = {
  isLoading: boolean;
  totalPokemonsCount: number;
};

export default function usePokemonsCount(): UsePokemonsCount {
  const [totalPokemonsCount, setTotalPokemonsCount] = useState<number>(151);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const getPokemonsCount = async () => {
      setIsLoading(true);
      const res = await fetch(
        "https://pokeapi.co/api/v2/pokemon-species?limit=1",
      );
      const data = (await res.json()) as { count: number };
      setTotalPokemonsCount(data.count);

      setIsLoading(false);
    };

    getPokemonsCount();
  }, []);

  return {
    isLoading,
    totalPokemonsCount,
  };
}
