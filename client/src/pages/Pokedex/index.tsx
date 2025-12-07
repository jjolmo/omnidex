import React from "react";
import PokedexContainer from "../../components/PokedexContainer";

interface PokedexProps {
  theme?: string;
  generation?: number;
  version: string;
}

export default function Pokedex(props: PokedexProps): JSX.Element {
  return (
    <PokedexContainer
      theme={props.theme}
      generation={props.generation}
      version={props.version}
    />
  );
}
