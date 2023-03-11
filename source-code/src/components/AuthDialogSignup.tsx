import React, { useMemo, useState } from "react";
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
import FormSubmitHidden from "./FormSubmitHidden";
import Skill from "./SkillItem";
import Skills from "./Skills";
import FormErrorDisplay from "./FormErrorDisplay";
import AuthDialogBtnClose from "./AuthDialogBtnClose";

function AuthDialogSignup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [skills, setSkills] = useState({});
  const [signingUp, setSigningUp] = useState(false);
  const navigate = useNavigate();
  const [errorDisplay, setErrorDisplay] = useState<"summary" | "firstError">(
    "summary"
  );

  const { close } = useAuthDialog();

  function submitHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (signingUp) {
      return;
    }

    setSigningUp(true);

    setTimeout(() => {
      setSigningUp(false);
      setUsername("");
      setPassword("");
      setTermsAccepted(false);
      alert("Login successful!");
      localStorage.setItem("login", JSON.stringify(true));
      navigate("/");
    }, 5000);
  }

  return (
    <AuthDialogCard>
      <Brand className="tablet:hidden" />
      <FormMultistepProvider
        onIndexChange={(index) => {
          setErrorDisplay(index == 1 ? "firstError" : "summary");
        }}
      >
        <div className="form">
          <Form
            nextOnSubmit
            className=""
            onSubmit={submitHandler}
            errorDisplay={errorDisplay}
            bailOnError={errorDisplay == "firstError"}
          >
            <FormMultistepWrapper>
              <FormMultistepItem>
                <div className="form__multi-step--item__lead">
                  <div>
                    <h3 className="form__multi-step--item__title">
                      CREATE A PERSONAL ACCOUNT
                    </h3>
                    <p className="form__multi-step--item__link">
                      Join the community of creative people, meet, share,
                      communicate <a href="#signin">Sign In</a>
                    </p>
                  </div>
                  <div>
                    <AuthDialogBtnClose hideOnMobile />
                    <FormMultistepNav
                      className="auth-dialog__card--back"
                      direction="start"
                      disabled={signingUp}
                      onIndexEnd={() => {
                        close();
                      }}
                      hideOnDesktop
                    >
                      <span className="material-symbols-outlined">
                        arrow_back
                      </span>
                    </FormMultistepNav>
                  </div>
                </div>
                <FormErrorDisplay />
                <FormInput
                  label="Username"
                  type="text"
                  autoFocus
                  value={username}
                  onChange={(username) => setUsername(username as string)}
                  validation={{
                    required: "Username is required!",
                  }}
                />

                <FormInput
                  label="Email"
                  type="email"
                  value={email}
                  onChange={(email) => setEmail(email as string)}
                  validation={{
                    required: "Email is required!",
                    email: (value) => `${value} is not a valid email address`,
                  }}
                />

                <FormInputPassword
                  label="Password"
                  value={password}
                  onChange={(password) => setPassword(password as string)}
                  validation={{
                    required: "Password is required!",
                  }}
                />

                <FormInputPassword
                  label="Confirm Password"
                  value={confirmPassword}
                  onChange={(confirmPassword) =>
                    setConfirmPassword(confirmPassword as string)
                  }
                  validation={{
                    required: "Password Confirmation is required!",
                    sameAs: {
                      value: password,
                      message: () =>
                        "Password Confirmation must be the same as Password",
                    },
                  }}
                />

                <FormInputCheck
                  label="Agree to privacy policy and terms of use"
                  onChange={(checked) => setTermsAccepted(checked as boolean)}
                  checked={termsAccepted}
                />

                <div className="form__actions">
                  <FormSubmitHidden />
                  <FormBtn
                    className="form__actions--btn full"
                    disabled={signingUp}
                    label="Next"
                    disableOnError
                    validate
                    next
                  />
                </div>
              </FormMultistepItem>
              <FormMultistepItem>
                <div className="form__multi-step--item__lead">
                  <div>
                    <FormMultistepNav
                      className="auth-dialog__card--back"
                      direction="start"
                      disabled={signingUp}
                      onIndexEnd={() => {
                        close();
                      }}
                    >
                      <span className="material-symbols-outlined">
                        arrow_back
                      </span>
                    </FormMultistepNav>
                    <h3 className="form__multi-step--item__title">
                      What skills do you have?
                    </h3>
                    <p className="form__multi-step--item__link">
                      Choose from the list of several skills that you own
                    </p>
                  </div>
                </div>
                <FormErrorDisplay />
                <div className="form__multi-step--item-wrapper alt">
                  <Skills
                    items={[
                      "Design",
                      "Development",
                      "Art-Design",
                      "UI",
                      "UX",
                      "Web-Development",
                      "Product",
                      "Python-Development",
                      "DevOps",
                      "Another",
                    ]}
                    value={skills}
                    onChange={(newSelection) => setSkills(newSelection)}
                    validation={{
                      oneOf: {
                        list: [
                          "Design",
                          "Development",
                          "Art-Design",
                          "UI",
                          "UX",
                          "Web-Development",
                          "Product",
                          "Python-Development",
                          "DevOps",
                        ],
                        message: () => "Please select at least one skill",
                      },
                    }}
                  />
                </div>
                <div className="form__actions">
                  <FormBtnSubmit
                    className="btn form__actions--btn full"
                    label="Continue"
                    loading={signingUp}
                    icon={
                      <span className="material-symbols-outlined">
                        arrow_forward
                      </span>
                    }
                    next
                  />
                </div>
              </FormMultistepItem>
            </FormMultistepWrapper>
          </Form>
        </div>
      </FormMultistepProvider>
    </AuthDialogCard>
  );
}

export default AuthDialogSignup;
