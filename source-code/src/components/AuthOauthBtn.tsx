import React from "react";

interface AuthOauthBtnProps {
  iconSrc?: string;
  label?: string;
}

function AuthOauthBtn({ iconSrc, label }: AuthOauthBtnProps) {
  return (
    <button className="btn oauth-login">
      {iconSrc && <img src={iconSrc} alt="" className="oauth-login--icon" />}
      {label && <span>{label}</span>}
    </button>
  );
}

export default AuthOauthBtn;
