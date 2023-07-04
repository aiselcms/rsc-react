import React, { useState, useEffect, useRef, FC } from "react";
import { LoadingIcon } from "./icons";
import Challenge from "./challenge";
import { CardProps } from "./interfaces/interfaces";

const Card: FC<CardProps> = ({
  text,
  fetchCaptchaCallback, // fetchCaptcha
  submitResponseCallback, // submitResponse,
}) => {
  const [key, setKey] = useState(Math.random());
  const [captcha, setCaptcha] = useState(false);
  const isMounted = useRef(false);

  const refreshCaptcha = () => {
    fetchCaptchaCallback().then((newCaptcha) => {
      setTimeout(() => {
        if (!isMounted.current) {
          return;
        }
        setKey(Math.random());
        setCaptcha(newCaptcha);
      }, 300);
    });
  };
  const completeCaptcha = (response, trail) =>
    new Promise((resolve) => {
      submitResponseCallback(response, trail).then((verified) => {
        if (verified) {
          resolve(true);
        } else {
          refreshCaptcha();
          resolve(false);
        }
      });
    });

  useEffect(() => {
    isMounted.current = true;
    refreshCaptcha();
    return () => {
      isMounted.current = false;
    };
  }, []);

  return (
    <div className="scaptcha-card-container scaptcha-card-element">
      {captcha ? (
        <Challenge
          key={key}
          text={text}
          captcha={captcha}
          completeCaptcha={completeCaptcha}
        />
      ) : (
        <div className="scaptcha-card-loading scaptcha-card-element">
          <LoadingIcon />
        </div>
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
