import React from "react";
import Brand from "./Brand";
import AuthPageCaption from "./AuthPageCaption";
import AuthOAuthLogins from "./AuthOAuthLogins";

function AuthPageActionsSection() {
  return (
    <section className="auth__actions">
      <Brand className="tablet:hidden" />
      <AuthPageCaption center />
      <div className="get-started">
        <h2>Get started </h2>
        <p>
          create a new account or log in <br /> already created
        </p>
      </div>
      <AuthOAuthLogins />
      <div className="divider">or</div>
      <div className="account">
        <a href="#signup" className="btn auth-btn">
          Create a New Account
        </a>
        <div className="account__alts">
          <span>Do you have account?</span>
          <a href="#signin" className="btn auth-btn">
            Sign In
          </a>
        </div>
      </div>
      <div className="policy">
        <a href="/">Privacy Policy</a>
      </div>
    </section>
  );
}

export default AuthPageActionsSection;
