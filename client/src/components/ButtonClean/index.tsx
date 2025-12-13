interface ButtonCleanProps {
  handleClick: () => void;
  buttonText: string;
}

export default function ButtonClean(props: ButtonCleanProps): JSX.Element {
  return (
    <>
      <button onClick={props.handleClick}>{props.buttonText}</button>
    </>
  );
}
