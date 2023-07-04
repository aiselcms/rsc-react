export enum CaptchaTheme {
  light = "light",
  dark = "dark",
}

export type TrailType = { x: number[]; y: number[] };
export type SubmitResponseCallbackType = (
  response: number,
  trail: TrailType
) => Promise<boolean>;

export interface SliderCaptchaTextProps {
  anchor: string;
  challenge: string;
}

export interface SliderCaptchaResult {
  successCallback: (token: string) => void; // callback
  createCallback: string; // create
  verifyCallback: string; // verify
  theme: CaptchaTheme; // variant
  text: SliderCaptchaTextProps;
}

export interface ThemeProps {
  theme: CaptchaTheme;
}

export interface CaptchaResult {
  background: string;
  slider: string;
}

export type FetchCaptchaCallbackType = () => Promise<CaptchaResult>;

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

export interface ChallengeProps {
  text: SliderCaptchaTextProps;
  captcha: CaptchaResult;
  completeCaptcha: SubmitResponseCallbackType;
}

export interface VerificationResult {
  result: string;
  token: string;
}
