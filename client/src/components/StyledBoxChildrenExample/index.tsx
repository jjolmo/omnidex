import { ReactElement } from "react";
import "./style.css";

interface StyledBoxChildrenExampleProps {
  children: any;
}

export const StyledBoxChildrenExample = ({
  children,
}: StyledBoxChildrenExampleProps) => {
  return (
    <div className="styled-box">
      <p>Pokemon description:</p>
      {children}
      <br />
      caca
    </div>
  );
};
