import React from "react";

import logo from "@assets/logo.svg";
import mobileLogo from "@assets/logo-mobile.svg";
import { createClasses } from "@/utils";

interface AuthCaptionProps {
  center?: boolean;
  alt?: boolean;
}

function AuthCaption({ center, alt }: AuthCaptionProps) {
  return (
    <div
      className={createClasses(
        "auth--caption",
        center && "center",
        alt && "alt"
      )}
    >
      <div className="auth--caption-graphics">
        <img src={logo} alt="logo" className="lg" />
        <img src={mobileLogo} alt="logo" className="mobile" />
        <span>Create</span>
      </div>
      <span>Communicate</span>
      <span>Decide</span>
    </div>
  );
}

export default AuthCaption;
