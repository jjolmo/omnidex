import { useContext } from "react";
import { PreferencesContext } from "../../contexts/PreferencesContext";

export default function LanguagePicker(): JSX.Element {
  const { language, languages, changeLanguage } =
    useContext(PreferencesContext);

  return (
    <>
      <select
        value={language}
        onChange={(event) => {
          changeLanguage(event.target.value);
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
