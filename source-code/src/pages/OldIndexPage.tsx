import "@style/App.scss";
import "@style/auth.scss";

import mobileLogo from "@assets/logo-mobile.svg";
import brand from "@assets/logo.svg";
import { useAuthDialog } from "@/hooks/useAuth";
import AuthDialog from "@components/AuthDialog";
import { useEffect, useState } from "react";
import AuthOAuthLogins from "@components/AuthOAuthLogins";

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
      >
        <div className="left">
          <div className="brand">
            <span>BA</span> ByAuthor
          </div>
          <div className="left-body">
            <img src={brand} alt="logo" />
            <span>Create</span>
            <span>Communicate</span>
            <span>Decide</span>
          </div>
          <div className="left-body__bottom">
            <p>
              Share your project and find <br /> new friends on the{" "}
              <span>new SMART</span> platform
            </p>
            <a href="/" className="create">
              Create a profile
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="21"
                fill="currentColor"
                className="bi bi-arrow-right"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"
                />
              </svg>
            </a>
          </div>
        </div>
        <div className="tablet-brand">
          <span>BA</span>
          <h1>ByAuthor</h1>
        </div>
        <section className="card-layout">
          <div className="brand">
            <span>BA</span>
            <h1>ByAuthor</h1>
          </div>
          <div className="card-header">
            <img src={mobileLogo} alt="" />
            <span>create</span>
            <span>communicate</span>
            <span>decide</span>
          </div>
          <div className="right">
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
            <div>
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
