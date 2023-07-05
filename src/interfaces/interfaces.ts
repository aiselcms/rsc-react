/*
  ENUMS
 */
export enum CaptchaTheme {
  light = "light",
  dark = "dark",
}

/*
  TYPES
 */
export type Trail = { x: number[]; y: number[] };
export type CaptchaResult = {
  background: string;
  slider: string;
};
export type VerificationResult = {
  result: string;
  token: string;
};

export type CreateCaptchaCallback = () => Promise<CaptchaResult>;
export type VerifyCaptchaCallback = (
  captchaResponse: number,
  trail: Trail
) => Promise<VerificationResult>;
export type SuccessCaptchaCallback = (token: string) => void;
export type SubmitResponseCallback = (
  captchaResponse: number,
  trail: Trail
) => Promise<boolean>;

export type CaptchaText = {
  anchor: string;
  challenge: string;
};

/*
  INTERFACES
 */

export interface SliderCaptchaProps {
  successCallback: SuccessCaptchaCallback; // callback
  createCallback: CreateCaptchaCallback; // create
  verifyCallback: VerifyCaptchaCallback; // verify
  theme: CaptchaTheme; // variant
  text: CaptchaText;
}

export interface ThemeProps {
  theme: CaptchaTheme;
}

export type FetchCaptchaCallbackType = () => Promise<CaptchaResult>;

export interface AnchorProps {
  text: CaptchaText;
  fetchCaptchaCallback: FetchCaptchaCallbackType; // fetchCaptcha
  submitResponseCallback: SubmitResponseCallback; // submitResponse
  verified: boolean;
}

export interface CardProps {
  text: CaptchaText;
  fetchCaptchaCallback: FetchCaptchaCallbackType; // fetchCaptcha
  submitResponseCallback: SubmitResponseCallback; // submitResponse
}

export interface ChallengeProps {
  text: CaptchaText;
  captcha: CaptchaResult;
  completeCaptcha: SubmitResponseCallback;
}
