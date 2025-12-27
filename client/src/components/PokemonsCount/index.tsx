import React, { useEffect, useState } from "react";
import { StyledBoxChildrenExample } from "../StyledBoxChildrenExample";

export default function PokemonsCount(): JSX.Element {
  const [totalPokemonsCount, setTotalPokemonsCount] = useState<number>(151);

  useEffect(() => {
    const getPokemonsCount = async () => {
      const res = await fetch(
        "https://pokeapi.co/api/v2/pokemon-species?limit=1",
      );
      const data = (await res.json()) as { count: number };
      setTotalPokemonsCount(data.count);
    };

    getPokemonsCount();
  }, []);

  return (
    <>
      <p>Pokes totales: {totalPokemonsCount}</p>

      <StyledBoxChildrenExample>asda asdasd asd sd</StyledBoxChildrenExample>
    </>
  );
}
