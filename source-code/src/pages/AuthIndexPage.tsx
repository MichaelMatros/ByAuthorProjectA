import "@style/app.scss";
import "@style/auth.scss";

import mobileLogo from "@assets/logo-mobile.svg";
import brand from "@assets/logo.svg";
import { useAuthDialog } from "@/hooks/useAuth";
import AuthDialog from "@components/AuthDialog";
import { useEffect, useState } from "react";
import Brand from "@/components/Brand";
import AuthPageTextSection from "@components/AuthPageTextSection";
import AuthPageActionsSection from "@components/AuthPageActionsSection";

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
        <AuthPageTextSection />
        <Brand className="hidden tablet:flex desktop:hidden mb-10" alt />
        <AuthPageActionsSection />
      </main>
      <AuthDialog show={showDialog} />
    </>
  );
}

export default AuthIndexPage;
