import React, { useState } from 'react';
import Anchor from './anchor';
import Theme from './theme';

const fetchCaptcha = (fetchCaptchaLink: string) => () =>
        fetch(fetchCaptchaLink, {
            // Use create as API URL for fetch
            method: 'GET',
            credentials: 'include',
        }).then((message) => message.json());

const fetchVerification = (fetchVerifyLink: string) => (response, trail) =>
        fetch(fetchVerifyLink, {
            // Verification API URL provided instead
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                response,
                trail,
            }),
        }).then((message) => message.json());

const SliderCaptcha = ({
                           callback,
                           create,
                           verify,
                           variant,
                           text,
                       }) => {
    const [verified, setVerified] = useState(false);
    const submitResponse = (response, trail) =>
        new Promise((resolve) => {
            fetchVerification(verify)(response, trail)
                .then((verification) => {
                    if (
                        !verification.result ||
                        verification.result !== 'success' ||
                        !verification.token
                    ) {
                        resolve(false);
                    } else {
                        setTimeout(() => {
                            callback(verification.token);
                            setVerified(true);
                        }, 500);
                        resolve(true);
                    }
                });
        });
    return (
        <div className="scaptcha-container">
            <Theme variant={variant} />
            <Anchor
                text={text}
                fetchCaptcha={fetchCaptcha(create)}
                submitResponse={submitResponse}
                verified={verified}
            />
        </div>
    );
};

export default SliderCaptcha;