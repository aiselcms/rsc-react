import React, { useState, useEffect, useRef, FC } from "react";
import Challenge from "./challenge";
import { CaptchaResult, CardProps, Trail } from "./interfaces/interfaces";

const Card: FC<CardProps> = ({
  text,
  fetchCaptchaCallback, // fetchCaptcha
  submitResponseCallback, // submitResponse,
  loadingIcon,
}) => {
  const [key, setKey] = useState(Math.random());
  const [captcha, setCaptcha] = useState<CaptchaResult>();
  const isMounted = useRef(false);

  const refreshCaptcha = (): void => {
    fetchCaptchaCallback()
      .then((newCaptcha: CaptchaResult) => {
        setTimeout(() => {
          if (!isMounted.current) {
            return;
          }
          setKey(Math.random());
          setCaptcha(newCaptcha);
        }, 300);
      })
      .catch((e) => console.log(e));
  };
  const completeCaptcha = async (
    captchaResponse: number,
    trail: Trail
  ): Promise<boolean> => {
    try {
      const result = await submitResponseCallback(captchaResponse, trail);
      if (result) {
        return true;
      } else {
        refreshCaptcha();
        return false;
      }
    } catch (e) {
      return Promise.reject(e);
    }
  };

  useEffect(() => {
    isMounted.current = true;
    refreshCaptcha();
    return () => {
      isMounted.current = false;
    };
  }, []);

  return (
    <div className="rsc-card-container rsc-open">
      {captcha ? (
        <Challenge
          key={key}
          text={text}
          captcha={captcha}
          completeCaptcha={completeCaptcha}
        />
      ) : (
        <div className="rsc-card-loading">{loadingIcon}</div>
      )}
    </div>
  );
};

/*
Card.propTypes = {
  fetchCaptcha: PropTypes.func.isRequired,
  submitResponse: PropTypes.func.isRequired,
  text: PropTypes.shape({
    anchor: PropTypes.string,
    challenge: PropTypes.string,
  }).isRequired,
};
 */

export default Card;
