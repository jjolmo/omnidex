import "./App.css";
import React, { useContext, useState } from "react";
import Pokedex from "./pages/Pokedex";
import GenerationSwitcher from "./components/GenerationSwitcher";
import VersionSwitcher from "./components/VersionSwitcher";
import PokemonsCount from "./components/PokemonsCount";
import LanguagePicker from "./components/LanguagePicker";
import { PreferencesContext } from "./contexts/PreferencesContext";
import ThemePicker from "./components/ThemePicker";

function App(): JSX.Element {
  const { theme } = useContext(PreferencesContext);
  const [generation, setGeneration] = useState<number>(1);
  const [version, setVersion] = useState<string>("");

  return (
    <div className="App">
      <VersionSwitcher
        onChangeVersion={(version) => {
          setVersion(version);
        }}
      />
      <ThemePicker />
      <LanguagePicker />

      {version !== "" ? (
        <Pokedex theme={theme} generation={generation} version={version} />
      ) : (
        <p>Loading...</p>
      )}

      <PokemonsCount />
    </div>
  );
}

export default App;
