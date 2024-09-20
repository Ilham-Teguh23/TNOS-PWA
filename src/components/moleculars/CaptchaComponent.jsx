import React, { useEffect } from "react";
import { loadCaptchaEnginge, LoadCanvasTemplate } from "react-simple-captcha";

function CaptchaComponent({ setValidateCaptcha, captcha }) {
  useEffect(() => {
    loadCaptchaEnginge(3, "#141414", "white", "lower");
  }, []);

  return (
    <LoadCanvasTemplate
      reloadText="Reload Captcha"
      reloadColor="var(--font-color3)"
    />
  );
}

export default CaptchaComponent;
