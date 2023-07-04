import React, { FC } from "react";
import lightTheme from "./style/light";
import darkTheme from "./style/dark";
import { CaptchaTheme, ThemeProps } from "./interfaces/interfaces";

const Theme: FC<ThemeProps> = ({ theme }) => (
  <style suppressHydrationWarning>
    {theme === CaptchaTheme.dark ? darkTheme : lightTheme}
  </style>
);

export default Theme;
