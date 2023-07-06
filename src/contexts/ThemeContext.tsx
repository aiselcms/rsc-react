import { createContext } from "react";

export enum CaptchaThemes {
  dark = "dark",
  light = "light",
}

export const ThemeContext = createContext({});
