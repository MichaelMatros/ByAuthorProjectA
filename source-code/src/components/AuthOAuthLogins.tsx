import React from "react";

import appleIcon from "@assets/apple.svg";
import googleIcon from "@assets/google.svg";
import AuthOauthBtn from "./AuthOauthBtn";

function AuthOAuthLogins() {
  return (
    <div className="w-full flex flex-col items-center gap-3">
      <AuthOauthBtn iconSrc={googleIcon} label="Google Login" />
      <AuthOauthBtn iconSrc={appleIcon} label="Apple Login" />
    </div>
  );
}

export default AuthOAuthLogins;
