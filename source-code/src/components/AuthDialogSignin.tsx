import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import AuthDialogCard from "./AuthDialogCard";
import AuthOAuthLogins from "./AuthOAuthLogins";
import FormInput from "./FormInput";
import FormInputCheck from "./FormInputCheck";
import Brand from "./Brand";
import Form from "./Form";
import { useAuthDialog } from "@/hooks/useAuth";
import FormBtnSubmit from "./FormBtnSubmit";
import FormBtn from "./FormBtn";
import FormMultistepProvider from "./FormMultistepProvider";
import FormMultistepItem from "./FormMultistepItem";
import FormMultistepWrapper from "./FormMultistepWrapper";
import FormMultistepNav from "./FormMultistepNav";
import FormInputPassword from "./FormInputPassword";
import FormErrorDisplay from "./FormErrorDisplay";

function AuthDialogSignin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [signingIn, setSigningIn] = useState(false);
  const navigate = useNavigate();

  const { close } = useAuthDialog();

  function submitHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (signingIn) {
      return;
    }

    setSigningIn(true);

    setTimeout(() => {
      setSigningIn(false);
      setUsername("");
      setPassword("");
      setRememberMe(false);
      alert("Login successful!");
      localStorage.setItem("login", JSON.stringify(true));
      navigate("/");
    }, 5000);
  }

  return (
    <AuthDialogCard>
      <Brand className="tablet:hidden" />
      <FormMultistepProvider>
        <div>
          <FormMultistepNav
            className="btn auth-dialog__card--back"
            direction="start"
            disabled={signingIn}
            onIndexEnd={() => {
              close();
            }}
          >
            <span className="material-symbols-outlined">arrow_back</span> Back
          </FormMultistepNav>
        </div>{" "}
        <AuthOAuthLogins />
        <div className="divider">or</div>
        <div className="form">
          <h3 className="form__title">Sign In</h3>
          <p className="form__link">
            Don't have an account? <a href="#signup">Sign Up</a>
          </p>
          <Form nextOnSubmit onSubmit={submitHandler}>
            <FormErrorDisplay />
            <FormMultistepWrapper>
              <FormMultistepItem>
                <div className="form__multi-step--item-wrapper">
                  <div className="form__multi-step--item-controls">
                    <FormInput
                      label="Email / Username"
                      type="text"
                      autoFocus
                      value={username}
                      onChange={(username) => setUsername(username as string)}
                      validation={{
                        required: "Email / Username is required!",
                      }}
                    />

                    <FormInputCheck
                      label="Remember me"
                      onChange={(checked) => setRememberMe(checked as boolean)}
                      checked={rememberMe}
                    />
                  </div>
                  <div className="form__actions">
                    <FormBtn
                      className="btn form__actions--btn"
                      disabled={signingIn}
                      label="Next"
                      disableOnError
                      validate
                      next
                    />
                  </div>
                </div>
              </FormMultistepItem>
              <FormMultistepItem>
                <div className="form__multi-step--item-wrapper">
                  <div className="form__multi-step--item-controls">
                    <FormInputPassword
                      label="Password"
                      autoFocus
                      value={password}
                      onChange={(password) => setPassword(password as string)}
                      validation={{
                        required: "Password is required!",
                      }}
                    />

                    <a
                      className="form__forgot-password"
                      href="#"
                      onClick={(e) => e.preventDefault()}
                    >
                      Forgot password?
                    </a>
                  </div>
                  <div className="form__actions">
                    <FormBtnSubmit
                      className="btn form__actions--btn"
                      label="Enter"
                      loading={signingIn}
                      next
                    />
                  </div>
                </div>
              </FormMultistepItem>
            </FormMultistepWrapper>
          </Form>
        </div>
      </FormMultistepProvider>
    </AuthDialogCard>
  );
}

export default AuthDialogSignin;
