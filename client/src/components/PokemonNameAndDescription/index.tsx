interface PokemonNameAndDescriptionProps {
  name: string;
  description: string;
}

export default function PokemonNameAndDescription(
  props: PokemonNameAndDescriptionProps,
): JSX.Element {
  return (
    <>
      <div className="pokemon-name capitalize">{props.name}</div>
      <div className="pokemon-description">{props.description}</div>
    </>
  );
}
