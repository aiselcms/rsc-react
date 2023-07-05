import React, { FC, useState } from "react";
import Anchor from "./anchor";
import Theme from "./theme";
import {
  CaptchaResult,
  CreateCaptchaCallbackType,
  SliderCaptchaResult,
  TrailType,
  VerificationResult,
  VerifyCaptchaCallbackType,
} from "./interfaces/interfaces";

const fetchCaptcha =
  (create: CreateCaptchaCallbackType) => async (): Promise<CaptchaResult> => {
    try {
      return await create();
    } catch (e) {
      return Promise.reject(e);
    }
    /* try {
    const response = await fetch(create, {
      method: "GET",
      credentials: "include",
    });

    return (await response.json()) as CaptchaResult;

  } catch (e) {
    return Promise.reject(e);
  }*/
  };

const fetchVerification =
  (verify: VerifyCaptchaCallbackType) =>
  async (
    captchaResponse: number,
    trail: TrailType
  ): Promise<VerificationResult> => {
    try {
      /* const response = await fetch(verify, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          captchaResponse,
          trail,
        }),
      });
      return (await response.json()) as VerificationResult;*/
      return await verify(captchaResponse, trail);
    } catch (e) {
      return Promise.reject(e);
    }
  };

const SliderCaptcha: FC<SliderCaptchaResult> = ({
  successCallback, // callback,
  createCallback, // create,
  verifyCallback, // verify,
  theme, // variant,
  text,
}) => {
  const [verified, setVerified] = useState(false);
  const submitResponse = async (
    captchaResponse: number,
    trail: TrailType
  ): Promise<boolean> => {
    try {
      const verification = await fetchVerification(verifyCallback)(
        captchaResponse,
        trail
      );
      if (
        !verification.result ||
        verification.result !== "success" ||
        !verification.token
      ) {
        return false;
      } else {
        setTimeout(() => {
          successCallback(verification.token);
          setVerified(true);
        }, 500);
        return true;
      }
    } catch (e) {
      return Promise.reject(e);
    }
  };

  return (
    <div className="scaptcha-container">
      <Theme theme={theme} />
      <Anchor
        text={text}
        fetchCaptchaCallback={fetchCaptcha(createCallback)}
        submitResponseCallback={submitResponse}
        verified={verified}
      />
    </div>
  );
};

/*
SliderCaptcha.propTypes = {
  callback: PropTypes.func,
  create: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  verify: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  variant: PropTypes.string,
  text: PropTypes.shape({
    anchor: PropTypes.string,
    challenge: PropTypes.string,
  }),
};
 */
/*
SliderCaptcha.defaultProps = {
  callback: (token) => console.log(token), // eslint-disable-line no-console
  create: "captcha/create",
  verify: "captcha/verify",
  variant: "light",
  text: {
    anchor: "I am human",
    challenge: "Slide to finish the puzzle",
  },
};*/

export default SliderCaptcha;
