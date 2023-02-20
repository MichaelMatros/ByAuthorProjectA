import React, { ReactNode } from "react";

interface AuthDialogProps {
  children: ReactNode;
  onClose?: () => void;
}

function AuthDialogCard({ children, onClose }: AuthDialogProps) {
  return (
    <div className="auth-dialog__card">
      <button className="auth-dialog__card--close" onClick={() => onClose?.()}>
        &#x2715;
      </button>
      {children}
    </div>
  );
}

export default AuthDialogCard;
