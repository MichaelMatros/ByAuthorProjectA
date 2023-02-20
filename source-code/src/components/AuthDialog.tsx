import { createPortal } from "react-dom";
import { useAuthDialog } from "../hooks/useAuth";

import "@style/auth.scss";
import AuthDialogSignin from "./AuthDialogSignin";
import AuthDialogSignup from "./AuthDialogSignup";
import { useRef } from "react";
import { useOutsideClick } from "../hooks/useMouse";

interface AuthDialogProps {
  show: boolean;
  onClose?: () => void;
}

function AuthDialog({ show = false, onClose }: AuthDialogProps) {
  const { currentDialogName } = useAuthDialog();

  function closeDialog() {
    window.location.hash = "";
    onClose?.();
  }

  const contentRef = useRef(null);
  useOutsideClick(contentRef, closeDialog);

  if (!show) {
    return <></>;
  }

  return createPortal(
    <div className="auth-dialog">
      <div ref={contentRef} className="auth-dialog__content">
        {currentDialogName == "signin" ? (
          <AuthDialogSignin onClose={closeDialog} />
        ) : (
          <AuthDialogSignup onClose={closeDialog} />
        )}
      </div>
    </div>,
    document.body
  );
}

export default AuthDialog;
