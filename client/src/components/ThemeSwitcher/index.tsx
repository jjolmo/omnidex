interface ThemeSwitcherProps {
  onChangeTheme?: (themeName: string) => void;
}

export const getClassNameWithTheme = (className: string, theme: string) => {
  if (theme) {
    return `${className} ${className}--${theme}`;
  } else {
    return `${className}`;
  }
};

// export es para poder usar la función desde cualquier parte del código, PERO hay que importar y cuando la llames desde fuera NO tiene contexto del componente (sus useStates por ejemplo)
export default function ThemeSwitcher(props: ThemeSwitcherProps): JSX.Element {
  return (
    <>
      <select
        onChange={(e) => {
          if (props.onChangeTheme) {
            props.onChangeTheme(e.target.value);
          }
        }}
        name="themes"
        id="theme"
      >
        <option value="light">Light</option>
        <option value="dark">Dark</option>
      </select>
    </>
  );
}
