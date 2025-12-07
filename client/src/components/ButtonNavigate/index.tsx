interface ButtonNavigateProps {
  handleClick: () => void;
  buttonText: string;
  enabled: boolean;
}

export default function ButtonNavigate(
  props: ButtonNavigateProps,
): JSX.Element {
  return (
    <>
      <button disabled={props.enabled === false} onClick={props.handleClick}>
        {props.buttonText}
      </button>
    </>
  );
}
