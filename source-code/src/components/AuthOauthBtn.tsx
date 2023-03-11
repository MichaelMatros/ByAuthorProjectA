import React from "react";

interface AuthOauthBtnProps {
  iconSrc?: string;
  label?: string;
}

function AuthOauthBtn({ iconSrc, label }: AuthOauthBtnProps) {
  return (
    <button className="btn font-poppins font-light text-base">
      {iconSrc && <img src={iconSrc} alt="" className="w-[19px]" />}
      {label && <span>{label}</span>}
    </button>
  );
}

export default AuthOauthBtn;
