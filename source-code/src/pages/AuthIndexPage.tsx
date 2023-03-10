import "@style/app.scss";
import "@style/auth.scss";

import mobileLogo from "@assets/logo-mobile.svg";
import brand from "@assets/logo.svg";
import { useAuthDialog } from "@/hooks/useAuth";
import AuthDialog from "@components/AuthDialog";
import { useEffect, useState } from "react";
import AuthOAuthLogins from "@components/AuthOAuthLogins";
import AuthCaption from "@/components/AuthCaption";
import Brand from "@/components/Brand";
import Space from "@/components/Space";

function randomBGImage() {
  const images = [
    "https://ic.wampi.ru/2023/02/13/Main-image-FinalVersion.jpg",
    "https://images.unsplash.com/photo-1640474252967-0615aef6d74c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
  ];

  return images[Math.floor(Math.random() * images.length)];
}

function AuthIndexPage() {
  const { showDialog } = useAuthDialog();
  const [currentBgImage, setCurrentBgImage] = useState("");

  useEffect(() => {
    setCurrentBgImage(randomBGImage());
  }, []);

  return (
    <>
      <main
        id="switch-image"
        style={{
          backgroundImage: `url(${currentBgImage})`,
        }}
        className="auth"
      >
        <div className="auth__text">
          <Brand alt lg />
          <Space />
          <AuthCaption alt />
          <Space />
          <div className="footer">
            <div className="footer__text">
              Share your project and find <br /> new friends on the
              <span> new SMART</span> platform
            </div>
            <Space />
            <div className="footer__link">
              <a href="#signup" className="create">
                Create a profile
                <span className="material-symbols-outlined">arrow_forward</span>
              </a>
            </div>
          </div>
        </div>
        <Brand className="hidden tablet:flex desktop:hidden mb-10" alt />
        <section className="auth__actions">
          <Brand className="tablet:hidden" />
          <AuthCaption center />
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
      </main>
      <AuthDialog show={showDialog} />
    </>
  );
}

export default AuthIndexPage;
