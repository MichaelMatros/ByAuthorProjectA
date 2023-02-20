import React from "react";

import appleIcon from "@assets/apple.svg";
import googleIcon from "@assets/google.svg";
import AuthOauthBtn from "./AuthOauthBtn";

function AuthOAuthLogins() {
  return (
    <div className="oauth-logins">
      <AuthOauthBtn iconSrc={googleIcon} label="Google Login" />
      <AuthOauthBtn iconSrc={appleIcon} label="Apple Login" />
    </div>
  );
}

export default AuthOAuthLogins;
