import React from "react";
import Brand from "./Brand";
import Space from "./Space";
import AuthPageCaption from "./AuthPageCaption";
import AuthPageTextSectionFooter from "./AuthPageSectionTextFooter";

function AuthPageSectionText() {
  return (
    <div className="auth__text">
      <Brand alt lg />
      <Space />
      <AuthPageCaption alt />
      <Space />
      <AuthPageTextSectionFooter />
    </div>
  );
}

export default AuthPageSectionText;
