import React, { FC, useState } from "react";
import Card from "./card";
import { SuccessIcon } from "./icons";
import { AnchorProps } from "./interfaces/interfaces";

const Anchor: FC<AnchorProps> = ({
  text,
  fetchCaptchaCallback, // fetchCaptcha,
  submitResponseCallback, // submitResponse,
  verified,
}) => {
  const [open, setOpen] = useState(false);
  const handleClose = (): void => {
    setOpen(false);
  };
  const handleOpen = (): void => {
    setOpen(true);
  };
  const handleKey = (e: React.KeyboardEvent): void => {
    if (e.code === "Enter" || e.code === "Space") {
      setOpen(true);
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  };

  return (
    <div className={"rsc-anchor"}>
      <div
        className="rsc-anchor-container scaptcha-anchor-element"
        onClick={handleOpen}
      >
        <button
          suppressHydrationWarning
          type="button"
          className={`rsc-anchor-checkbox ${
            !verified && "rsc-anchor-checkbox-default"
          } scaptcha-anchor-element`}
          onKeyUp={handleKey}
        >
          {verified && <SuccessIcon />}
        </button>
        <div className="rsc-anchor-label scaptcha-anchor-element">
          {!verified ? text.anchorInit : text.anchorSuccess}
        </div>
      </div>
      {!verified && open && (
        <div>
          <div className="rsc-hidden" onClick={handleClose} />
          <Card
            fetchCaptchaCallback={fetchCaptchaCallback}
            submitResponseCallback={submitResponseCallback}
            text={text}
          />
        </div>
      )}
    </div>
  );
};

/*
Anchor.propTypes = {
  fetchCaptcha: PropTypes.func.isRequired,
  submitResponse: PropTypes.func.isRequired,
  text: PropTypes.shape({
    anchor: PropTypes.string,
    challenge: PropTypes.string,
  }).isRequired,
  verified: PropTypes.bool.isRequired,
};
*/

export default Anchor;
