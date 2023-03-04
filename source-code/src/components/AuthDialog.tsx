import { createPortal } from "react-dom";
import { useAuthDialog } from "../hooks/useAuth";

import "@style/auth.scss";
import AuthDialogSignin from "./AuthDialogSignin";
import AuthDialogSignup from "./AuthDialogSignup";
import { createContext, useRef } from "react";
import { useOutsideClick } from "../hooks/useMouse";

interface AuthDialogContext {
  /** Closes the currently opened dialog */
  close: () => void;
}

export const AuthDialogContext = createContext<AuthDialogContext>({
  close() {},
});

interface AuthDialogProps {
  show: boolean;
  onClose?: () => void;
}

function AuthDialog({ show = false, onClose = () => {} }: AuthDialogProps) {
  const { currentDialogName } = useAuthDialog();

  const contentRef = useRef(null);
  function closeDialog() {
    window.location.hash = "";
    onClose();
  }

  useOutsideClick(contentRef, closeDialog);

  if (!show) {
    return <></>;
  }

  return createPortal(
    <div className="auth-dialog">
      <div ref={contentRef} className="auth-dialog__content">
        <AuthDialogContext.Provider value={{ close: closeDialog }}>
          {currentDialogName == "signin" ? (
            <AuthDialogSignin />
          ) : (
            <AuthDialogSignup />
          )}
        </AuthDialogContext.Provider>
      </div>
    </div>,
    document.body
  );
}

export default AuthDialog;
