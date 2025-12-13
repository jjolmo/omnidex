import { useContext } from "react";
import { PreferencesContext } from "../../contexts/PreferencesContext";

export default function LanguagePicker(): JSX.Element {
  const { languages, setLanguage } = useContext(PreferencesContext);

  return (
    <>
      <select
        onChange={(event) => {
          setLanguage(event.target.value);
        }}
        name="languages"
        id="languages"
      >
        {languages.map((lang) => {
          return (
            <option key={lang} value={lang}>
              {lang.toUpperCase()}
            </option>
          );
        })}
      </select>
    </>
  );
}
