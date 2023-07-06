import React, { FC, useState } from "react";
import Anchor from "./anchor";
import {
  CaptchaResult,
  CreateCaptchaCallback,
  SliderCaptchaProps,
  Trail,
  VerificationResult,
  VerifyCaptchaCallback,
} from "./interfaces/interfaces";
import ThemeProvider from "./providers/ThemeProvider";

const fetchCaptcha =
  (create: CreateCaptchaCallback) => async (): Promise<CaptchaResult> => {
    try {
      return await create();
    } catch (e) {
      console.log(e);
      return Promise.reject(e);
    }
  };

const fetchVerification =
  (verify: VerifyCaptchaCallback) =>
  async (
    captchaResponse: number,
    trail: Trail
  ): Promise<VerificationResult> => {
    try {
      return await verify(captchaResponse, trail);
    } catch (e) {
      return Promise.reject(e);
    }
  };

const SliderCaptcha: FC<SliderCaptchaProps> = ({
  successCallback, // callback,
  createCallback, // create,
  verifyCallback, // verify,
  text,
}) => {
  const [verified, setVerified] = useState(false);
  const submitResponse = async (
    captchaResponse: number,
    trail: Trail
  ): Promise<boolean> => {
    try {
      const verification = await fetchVerification(verifyCallback)(
        captchaResponse,
        trail
      );
      if (!verification.result || !verification.token) {
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
    <ThemeProvider>
      <div className="rsc-container">
        <Anchor
          text={text}
          fetchCaptchaCallback={fetchCaptcha(createCallback)}
          submitResponseCallback={submitResponse}
          verified={verified}
        />
      </div>
    </ThemeProvider>
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
