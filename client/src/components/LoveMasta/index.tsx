import React, { useState, useRef } from "react";

export const LoveMasta: React.FC = () => {
  // Define el texto inicial directamente aquí. ¡Ajusta este texto a tu gusto!
  const initialText: string = "❤️ Masta";

  const [text, setText] = useState<string>(initialText);
  const intervalId = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = (): void => {
    if (intervalId.current) {
      clearInterval(intervalId.current);
    }
    intervalId.current = setInterval(() => {
      setText((prevText) => "❤️" + prevText);
    }, 10); // Intervalo
  };

  const handleMouseLeave = (): void => {
    if (intervalId.current) {
      clearInterval(intervalId.current);
      intervalId.current = null;
    }
    // Restauramos el texto al valor original que definimos
    //setText(initialText);
  };

  return (
    <span onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      {text}
    </span>
  );
};
