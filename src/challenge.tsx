import React, { FC, useState } from "react";
import { ArrowIcon, SuccessIcon, FailureIcon } from "./icons";
import { ChallengeProps } from "./interfaces/interfaces";

const imageDataUrl = (image: string): string => {
  return `data:image/png;base64,${image}`;
};

const slider = {
  default: {
    track: "rsc-card-slider-track-default",
    control: "rsc-card-slider-control-default",
    icon: <ArrowIcon />,
  },
  active: {
    track: "rsc-card-slider-track-active",
    control: "rsc-card-slider-control-active",
    icon: <ArrowIcon />,
  },
  success: {
    track: "rsc-card-slider-track-success",
    control: "rsc-card-slider-control-success",
    icon: <SuccessIcon />,
  },
  failure: {
    track: "rsc-card-slider-track-failure",
    control: "rsc-card-slider-control-failure",
    icon: <FailureIcon />,
  },
};

const Challenge: FC<ChallengeProps> = ({ text, captcha, completeCaptcha }) => {
  const [sliderVariant, setSliderVariant] = useState(slider.default);
  const [solving, setSolving] = useState(false);
  const [submittedResponse, setSubmittedResponse] = useState(false);
  const [origin, setOrigin] = useState({
    x: 0,
    y: 0,
  });
  const [trail, setTrail] = useState({
    x: [0],
    y: [0],
  });

  // Converts distances along the control track to corresponding distances moved by the puzzle piece
  const scaleSliderPosition = (x: number): number => 5 + 0.86 * x;

  const handleStart = (x: number, y: number): void => {
    if (submittedResponse) {
      return;
    }
    setOrigin({
      x: x,
      y: y,
    });
    setSolving(true);
    setSliderVariant(slider.active);
  };

  const handleTouchStart = (e: React.TouchEvent): void => {
    handleStart(e.touches[0].clientX, e.touches[0].clientY);
  };

  const handleMouseStart = (e: React.MouseEvent): void => {
    handleStart(e.clientX, e.clientY);
  };

  const handleMove = (x: number, y: number): void => {
    if (!solving || submittedResponse) {
      return;
    }
    const move = {
      x: x - origin.x,
      y: y - origin.y,
    };
    if (move.x > 225 || move.x < 0) {
      return;
    } // Don't update if outside bounds of captcha
    setTrail({
      x: trail.x.concat([move.x]),
      y: trail.y.concat([move.y]),
    });
  };

  const handleTouchMove = (e: React.TouchEvent): void => {
    handleMove(e.touches[0].clientX, e.touches[0].clientY);
  };

  const handleMouseMove = (e: React.MouseEvent): void => {
    handleMove(e.clientX, e.clientY);
  };

  const handleEnd = (): void => {
    if (!solving || submittedResponse) {
      return;
    }
    setSubmittedResponse(true);
    completeCaptcha(scaleSliderPosition(trail.x[trail.x.length - 1]), trail)
      .then((validated) => {
        setSliderVariant(validated ? slider.success : slider.failure);
      })
      .catch((e) => console.log(e));
  };

  const handleEnter = (): void => {
    if (solving || submittedResponse) {
      return;
    }
    setSliderVariant(slider.active);
  };

  const handleLeave = (): void => {
    if (solving) {
      return;
    }
    setSliderVariant(slider.default);
  };

  return (
    <div
      draggable="false"
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleEnd}
      onMouseUp={handleEnd}
      onMouseLeave={handleEnd}
    >
      <div
        className="rsc-card-backgroundt"
        style={{
          backgroundImage: `url('${imageDataUrl(captcha.background)}')`,
        }}
      />
      <div
        className="rsc-card-slider-puzzle"
        style={{
          backgroundImage: `url('${imageDataUrl(captcha.slider)}')`,
          left: `${scaleSliderPosition(trail.x[trail.x.length - 1])}px`,
        }}
        onMouseDown={handleMouseStart}
        onTouchStart={handleTouchStart}
      />
      <div className="rsc-card-slider-container">
        <div className="rsc-card-slider-track" />
        <div
          className="rsc-card-slider-label"
          style={{ opacity: solving ? 0 : 1 }}
        >
          <span>{text.challenge}</span>
        </div>
        <div
          className={`rsc-card-slider-mask ${sliderVariant.track}`}
          style={{ width: `${trail.x[trail.x.length - 1] + 26}px` }}
        />
        <div
          className="rsc-card-slider-container"
          draggable="false"
        />
        <div
          className={`rsc-card-slider-control ${sliderVariant.control}`}
          style={{ left: `${trail.x[trail.x.length - 1]}px` }}
          onMouseDown={handleMouseStart}
          onTouchStart={handleTouchStart}
          onMouseEnter={handleEnter}
          onMouseLeave={handleLeave}
        >
          {sliderVariant.icon}
        </div>
      </div>
    </div>
  );
};

/* Challenge.propTypes = {
  completeCaptcha: PropTypes.func.isRequired,
  captcha: PropTypes.shape({
    slider: PropTypes.shape({
      type: PropTypes.string,
      data: PropTypes.arrayOf(PropTypes.number),
    }),
    background: PropTypes.shape({
      type: PropTypes.string,
      data: PropTypes.arrayOf(PropTypes.number),
    }),
  }).isRequired,
  text: PropTypes.shape({
    anchor: PropTypes.string,
    challenge: PropTypes.string,
  }).isRequired,
};*/

export default Challenge;
