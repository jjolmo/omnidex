import React, { useEffect, useState } from "react";

interface GenerationSwitcherProps {
  onChangeGeneration?: (generation: number) => void;
}

// export es para poder usar la función desde cualquier parte del código, PERO hay que importar y cuando la llames desde fuera NO tiene contexto del componente (sus useStates por ejemplo)
export default function GenerationSwitcher(
  props: GenerationSwitcherProps,
): JSX.Element {
  const [totalGenerationsCount, setTotalGenerationsCount] = useState<number>(1);

  useEffect(() => {
    const getGenerationsCount = async () => {
      const res = await fetch("https://pokeapi.co/api/v2/generation/");
      const data = (await res.json()) as { count: number };
      setTotalGenerationsCount(data.count);
    };

    getGenerationsCount();
  }, []); // array vacío, sólo se ejecuta una vez

  let selectOptions = [];
  for (let i = 1; i <= totalGenerationsCount; i++) {
    selectOptions.push(String(i));
  }

  return (
    <>
      <select
        className="version-select, capitalize"
        onChange={(e) => {
          if (props.onChangeGeneration) {
            props.onChangeGeneration(+e.target.value);
          }
        }}
        name="generations"
        id="generation"
      >
        {selectOptions.map((generation) => (
          <option key={generation} value={generation}>
            Gen {generation}
          </option>
        ))}
      </select>
    </>
  );
}
