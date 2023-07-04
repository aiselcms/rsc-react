import React, { FC, useState } from "react";
import Anchor from "./anchor";
import Theme from "./theme";
import { SliderCaptchaProps } from "@/interfaces/interfaces";

const fetchCaptcha = (create) => () =>
  create instanceof Function
    ? create() // Use provided promise for getting background and slider
    : fetch(create, {
        // Use create as API URL for fetch
        method: "GET",
        credentials: "include",
      }).then((message) => message.json());

const fetchVerification = (verify) => (response, trail) =>
  verify instanceof Function
    ? verify(response, trail) // Use provided promise for verifying captcha
    : fetch(verify, {
        // Verification API URL provided instead
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          response,
          trail,
        }),
      }).then((message) => message.json());

const SliderCaptcha: FC<SliderCaptchaProps> = ({
  successCallback, // callback,
  createCallback, // create,
  verifyCallback, // verify,
  theme, // variant,
  text,
}) => {
  const [verified, setVerified] = useState(false);
  const submitResponse = (response, trail): Promise<unknown> =>
    new Promise((resolve) => {
      fetchVerification(verifyCallback)(response, trail).then(
        (verification) => {
          if (
            !verification.result ||
            verification.result !== "success" ||
            !verification.token
          ) {
            resolve(false);
          } else {
            setTimeout(() => {
              successCallback(verification.token);
              setVerified(true);
            }, 500);
            resolve(true);
          }
        }
      );
    });
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
