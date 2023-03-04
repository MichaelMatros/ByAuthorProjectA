import { useAuthDialog } from "@/hooks/useAuth";
import React from "react";
import iconClose from "@assets/icon-close.svg";
import { createClasses } from "@/utils";

interface AuthDialogBtnProps {
  hideOnMobile?: boolean;
}

function AuthDialogBtnClose({ hideOnMobile }: AuthDialogBtnProps) {
  const { close } = useAuthDialog();

  return (
    <button
      className={createClasses(
        "auth-dialog__card--close",
        hideOnMobile && "no-mobile"
      )}
      onClick={close}
    >
      <img src={iconClose} />
    </button>
  );
}

export default AuthDialogBtnClose;
