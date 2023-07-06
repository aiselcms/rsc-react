import React, { FC } from "react";
import { CaptchaThemes, ThemeContext } from "@/contexts/ThemeContext";

const getTheme = (): CaptchaThemes => {
  const userMedia = window.matchMedia("(prefers-color-scheme: light)");
  if (userMedia.matches) {
    return CaptchaThemes.light;
  }
  return CaptchaThemes.dark;
};

interface ThemeProviderProps {
  children: JSX.Element;
}

const ThemeProvider: FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = React.useState(getTheme);

  React.useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  window
    .matchMedia("(prefers-color-scheme: light)")
    .addEventListener("change", (e) => {
      document.documentElement.dataset.theme = e.matches
        ? CaptchaThemes.light
        : CaptchaThemes.dark;
    });

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
