interface PokemonNameAndDescription {
    name: string
    description: string
}

export default function PokemonNameAndDescription(props: PokemonNameAndDescription): JSX.Element {
    return (
        <>
            <div className="pokemon-name">{props.name}</div>
            <div className="pokemon-description">{props.description}</div>
        </>
    );
}