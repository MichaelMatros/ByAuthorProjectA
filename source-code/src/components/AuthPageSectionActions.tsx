import React from "react";
import Brand from "./Brand";
import AuthPageCaption from "./AuthPageCaption";
import AuthOAuthLogins from "./AuthOAuthLogins";
import Divider from "./Divider";
import AuthPageSectionActionsBtn from "./AuthPageSectionActionsBtn";
import Space from "./Space";

function AuthPageSectionActions() {
  return (
    <section className="auth__actions">
      <Space className="hidden tablet:flex" />
      <Brand className="tablet:hidden" />
      <AuthPageCaption center />
      <div className="hidden tablet:flex font-montserrat text-app-dark flex-col items-center text-center uppercase">
        <h2 className="text-[30px] font-medium mb-3">Get started </h2>
        <p className="text-base text-app-dark-header-2">
          create a new account or log in <br /> already created
        </p>
      </div>
      <AuthOAuthLogins />
      <Divider>or</Divider>
      <div className="account">
        <AuthPageSectionActionsBtn to="#signup" label="Create a New Account" />
        <div className="account__alts">
          <span>Do you have account?</span>
          <AuthPageSectionActionsBtn to="#signin" label="Sign In" />
        </div>
      </div>
      <Space />
      <div className="policy">
        <a href="/">Privacy Policy</a>
      </div>
    </section>
  );
}

export default AuthPageSectionActions;
