import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import AuthDialogCard from "./AuthDialogCard";
import AuthOAuthLogins from "./AuthOAuthLogins";
import FormInput from "./FormInput";
import FormInputCheck from "./FormInputCheck";
import Brand from "./Brand";

function AuthDialogSignin({ ...props }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [signingIn, setSigningIn] = useState(false);
  const navigate = useNavigate();

  function submitHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (signingIn) {
      return;
    }

    if (currentIndex == 0) {
      incIndex();
      return;
    }

    setSigningIn(true);

    setTimeout(() => {
      setSigningIn(false);
      setUsername("");
      setPassword("");
      setRememberMe(false);
      setCurrentIndex(0);
      alert("Login successful!");
      localStorage.setItem("login", JSON.stringify(true));
      navigate("/");
    }, 5000);
  }
  function incIndex() {
    setCurrentIndex((index) => index + 1);
  }
  function decIndex() {
    setCurrentIndex((index) => index - 1);
  }
  function handleBackClick() {
    if (currentIndex == 0) {
      window.location.hash = "";
      return;
    }

    decIndex();
  }
  return (
    <AuthDialogCard {...props}>
      <Brand />
      <div>
        <button
          className="btn auth-dialog__card--back"
          onClick={handleBackClick}
          disabled={signingIn}
        >
          <span className="material-symbols-outlined">arrow_back</span> Back
        </button>
      </div>{" "}
      <AuthOAuthLogins />
      <div className="divider">or</div>
      <div className="form">
        <h3 className="form__title">Sign In</h3>
        <p className="form__link">
          Don't have an account? <a href="#signup">Sign Up</a>
        </p>

        {/* TODO: Convert this into a re-usable component for easier reuse (i.e in signup form) */}
        <form className="form__multi-step" onSubmit={submitHandler}>
          {currentIndex == 0 && (
            <div className="form__multi-step--step">
              <FormInput
                label="Email / Username"
                type="text"
                autoFocus
                value={username}
                onChange={(username) => setUsername(username as string)}
              />

              <FormInputCheck
                label="Remember me"
                onChange={(checked) => setRememberMe(checked as boolean)}
                checked={rememberMe}
              />
              <div className="form__actions">
                <button
                  className="btn form__actions--btn"
                  type="button"
                  onClick={incIndex}
                  disabled={signingIn}
                >
                  Next
                </button>
              </div>
            </div>
          )}
          {currentIndex == 1 && (
            <div className="form__multi-step--step">
              <FormInput
                label="Password"
                type="password"
                autoFocus
                value={password}
                onChange={(password) => setPassword(password as string)}
              />

              <a className="form__forgot-password" href="Javascript:void(0)">
                Forgot password?
              </a>
              <div className="form__actions">
                <button
                  type="submit"
                  className="btn form__actions--btn"
                  disabled={signingIn}
                >
                  {signingIn ? "Please wait..." : "Enter"}
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </AuthDialogCard>
  );
}

export default AuthDialogSignin;
