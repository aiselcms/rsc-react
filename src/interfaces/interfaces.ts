export enum AppTheme {
  light = "light",
  dark = "dark",
}

export interface SliderCaptchaTextProps {
  anchor: string;
  challenge: string;
}

export interface SliderCaptchaProps {
  successCallback: (token: string) => void; // callback
  createCallback: string; // create
  verifyCallback: string; // verify
  theme: AppTheme; // variant
  text: SliderCaptchaTextProps;
}

export interface ThemeProps {
  theme: AppTheme;
}

export interface AnchorProps {
  text: SliderCaptchaTextProps;
  fetchCaptchaCallback: (
    create: string | SliderCaptchaProps["createCallback"]
  ) => void; // fetchCaptcha
  submitResponseCallback: (response: {}, trail: {}) => Promise<unknown>; // submitResponse
  verified: boolean;
}
