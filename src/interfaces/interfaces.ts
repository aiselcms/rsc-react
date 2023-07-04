export enum CaptchaTheme {
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
  theme: CaptchaTheme; // variant
  text: SliderCaptchaTextProps;
}

export interface ThemeProps {
  theme: CaptchaTheme;
}

export type FetchCaptchaCallbackType = () => void;
export type SubmitResponseCallbackType = (
  response: {},
  trail: {}
) => Promise<unknown>;

export interface AnchorProps {
  text: SliderCaptchaTextProps;
  fetchCaptchaCallback: FetchCaptchaCallbackType; // fetchCaptcha
  submitResponseCallback: SubmitResponseCallbackType; // submitResponse
  verified: boolean;
}

export interface CardProps {
  text: SliderCaptchaTextProps;
  fetchCaptchaCallback: FetchCaptchaCallbackType; // fetchCaptcha
  submitResponseCallback: SubmitResponseCallbackType; // submitResponse
}
