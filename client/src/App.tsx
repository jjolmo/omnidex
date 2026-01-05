import "./App.css";
import React, { useContext, useState } from "react";
import Pokedex from "./pages/Pokedex";
import GenerationSwitcher from "./components/GenerationSwitcher";
import VersionSwitcher from "./components/VersionSwitcher";
import PokemonsCount from "./components/PokemonsCount";
import LanguagePicker from "./components/LanguagePicker";
import { PreferencesContext } from "./contexts/PreferencesContext";
import ThemePicker from "./components/ThemePicker";
import { BrowserRouter, Routes, Route, Link } from "react-router";
import About from "./pages/About";
import useTranslate from "./hooks/useTranslate";

function App(): JSX.Element {
  const { theme } = useContext(PreferencesContext);
  const [generation, setGeneration] = useState<number>(1);
  const [version, setVersion] = useState<string>("");
  const { translate } = useTranslate();

  return (
    <div className="App">
      <BrowserRouter>
        <header>
          <ThemePicker />
          <LanguagePicker />
          <VersionSwitcher
            onChangeVersion={(version) => {
              setVersion(version);
            }}
          />
          <h1>Omnidex</h1>
          <ul>
            <li>
              {/*
              Link (con mayúsculas) es el equivalente a 'a' de HTML pero de React-Route que no recarga la web entera, como haríamos
             */}
              <Link to="/">
                <button>Pokedex</button>
              </Link>
            </li>
            <li>
              <Link to="about/">
                <button>{translate("About")}</button>
              </Link>
            </li>
          </ul>
        </header>
        <main>
          {/*
        {version !== "" ? (
          <Pokedex theme={theme} generation={generation} version={version} />
        ) : (
          <p>Loading...</p>
        )}
         */}
          <Routes>
            <Route
              path="/"
              action
              element={
                <Pokedex
                  theme={theme}
                  generation={generation}
                  version={version}
                />
              }
            />
            <Route
              path="pokemon/:pokeId/"
              element={
                <Pokedex
                  theme={theme}
                  generation={generation}
                  version={version}
                />
              }
            />
            <Route path="about" element={<About />} />
            <Route path="*" element={<div>Error 404</div>} />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;
