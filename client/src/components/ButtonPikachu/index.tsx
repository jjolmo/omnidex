interface ButtonPikachuProps {
  handleClick: () => void;
}

export default function ButtonPikachu(props: ButtonPikachuProps): JSX.Element {
  return (
    <>
      <button onClick={props.handleClick}>Pikachu</button>
    </>
  );
}
