import React, { ReactNode } from "react";
import Brand from "./Brand";

interface AuthDialogProps {
  children: ReactNode;
}

function AuthDialogCard({ children }: AuthDialogProps) {
  return (
    <>
      <Brand className="hidden tablet:flex desktop:hidden" alt lg />
      <div className="auth-dialog__card">{children}</div>
    </>
  );
}

export default AuthDialogCard;
