import React, { ReactNode } from "react";
import Brand from "./Brand";

interface AuthDialogProps {
  children: ReactNode;
}

function AuthDialogCard({ children }: AuthDialogProps) {
  return (
    <>
      <Brand tabletOnly alt lg />
      <div className="auth-dialog__card">{children}</div>
    </>
  );
}

export default AuthDialogCard;
