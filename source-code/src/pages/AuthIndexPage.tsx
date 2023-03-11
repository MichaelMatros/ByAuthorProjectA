import "@style/app.scss";
import "@style/auth.scss";

import mobileLogo from "@assets/logo-mobile.svg";
import brand from "@assets/logo.svg";
import { useAuthDialog } from "@/hooks/useAuth";
import AuthDialog from "@components/AuthDialog";
import { useEffect, useRef, useState } from "react";
import Brand from "@/components/Brand";
import AuthPageSectionText from "@components/AuthPageSectionText";
import AuthPageSectionActions from "@components/AuthPageSectionActions";
import { randomBGImage } from "@/utils";

function AuthIndexPage() {
  const { showDialog } = useAuthDialog();
  const bgImageRef = useRef(randomBGImage());

  return (
    <>
      <main
        id="switch-image"
        style={{
          backgroundImage: `url(${bgImageRef.current})`,
        }}
        className="auth"
      >
        <AuthPageSectionText />
        <Brand className="hidden tablet:flex desktop:hidden mb-10" alt />
        <AuthPageSectionActions />
      </main>
      <AuthDialog show={showDialog} />
    </>
  );
}

export default AuthIndexPage;
