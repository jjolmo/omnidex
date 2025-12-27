import { useContext } from "react";
import { PreferencesContext } from "../../contexts/PreferencesContext";

export const getClassNameWithTheme = (className: string, theme: string) => {
  if (theme) {
    return `${className} ${className}--${theme}`;
  } else {
    return `${className}`;
  }
};

export default function ThemePicker(): JSX.Element {
  const { theme, themes, changeTheme } = useContext(PreferencesContext);

  return (
    <>
      <select
        value={theme}
        onChange={(event) => {
          changeTheme(event.target.value);
        }}
        name="themes"
        id="themes"
      >
        {themes.map((th) => {
          return (
            <option key={th} value={th}>
              {th}
            </option>
          );
        })}
      </select>
    </>
  );
}
