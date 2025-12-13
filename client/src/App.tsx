import "./App.css";
import React, { useState } from "react";
import Pokedex from "./pages/Pokedex";
import ThemeSwitcher from "./components/ThemeSwitcher";
import GenerationSwitcher from "./components/GenerationSwitcher";
import VersionSwitcher from "./components/VersionSwitcher";
import PokemonsCount from "./components/PokemonsCount";
import LanguagePicker from "./components/LanguagePicker";

function App(): JSX.Element {
  const [theme, setTheme] = useState<string>("light");
  const [generation, setGeneration] = useState<number>(1);
  const [version, setVersion] = useState<string>("");

  return (
    <div className="App">
      <ThemeSwitcher
        onChangeTheme={(theme) => {
          setTheme(theme);
        }}
      />

      <VersionSwitcher
        onChangeVersion={(version) => {
          setVersion(version);
        }}
      />
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
