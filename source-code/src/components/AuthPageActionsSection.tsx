import React from "react";
import Brand from "./Brand";
import AuthPageCaption from "./AuthPageCaption";
import AuthOAuthLogins from "./AuthOAuthLogins";
import AuthPageActionsSectionBtn from "./AuthPageActionsSectionBtn";

function AuthPageActionsSection() {
  return (
    <section className="auth__actions">
      <Brand className="tablet:hidden" />
      <AuthPageCaption center />
      <div className="hidden desktop:flex font-montserrat text-app-dark flex-col items-center text-center uppercase">
        <h2 className="text-[30px] font-medium mb-3">Get started </h2>
        <p className="text-base text-app-dark-header-2">
          create a new account or log in <br /> already created
        </p>
      </div>
      <AuthOAuthLogins />
      <div className="divider">or</div>
      <div className="account">
        <AuthPageActionsSectionBtn to="#signup" label="Create a New Account" />
        <div className="account__alts">
          <span>Do you have account?</span>
          <AuthPageActionsSectionBtn to="#signin" label="Sign In" />
        </div>
      </div>
      <div className="policy">
        <a href="/">Privacy Policy</a>
      </div>
    </section>
  );
}

export default AuthPageActionsSection;
