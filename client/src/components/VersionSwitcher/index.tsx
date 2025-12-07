import React, { useEffect, useState } from "react";

interface VersionSwitcherProps {
  onChangeVersion?: (version: string) => void;
}

type PokeApiVersionResponse = {
  count: number;
  next: string;
  results: Version[];
};

type Version = {
  name: string;
};

// export es para poder usar la función desde cualquier parte del código, PERO hay que importar y cuando la llames desde fuera NO tiene contexto del componente (sus useStates por ejemplo)
export default function VersionSwitcher(
  props: VersionSwitcherProps,
): JSX.Element {
  const [versions, setVersions] = useState<Version[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchVersions = async () => {
      setIsLoading(true);
      let versions = [];
      let urlNextPage = "https://pokeapi.co/api/v2/version/?limit=20";

      while (urlNextPage) {
        try {
          const response = await fetch(urlNextPage);
          const data: PokeApiVersionResponse = await response.json();
          versions.push(...data.results);
          await new Promise((r) => setTimeout(r, 100));
          urlNextPage = data.next;
          debugger;
        } catch (e) {
          //salimos
          break;
        }
      }

      if (versions?.length) {
        setVersions(versions);
      }
      setIsLoading(false);

      //await new Promise(r => setTimeout(r, 4000));
    };

    fetchVersions();
  }, []);

  if (isLoading) {
    return <>Loading</>;
  }

  return (
    <>
      <select
        className="generation-select, capitalize"
        onChange={(e) => {
          if (props.onChangeVersion) {
            props.onChangeVersion(e.target.value);
          }
        }}
      >
        name="generations" id="generation"
        {versions.map((version) => (
          <option key={version.name} value={version.name}>
            {version.name}
          </option>
        ))}
      </select>
    </>
  );
}
