import React from "react";

interface AuthPageSectionActionsBtnProps {
  to?: string;
  label: string;
}

function AuthPageSectionActionsBtn({
  to,
  label,
}: AuthPageSectionActionsBtnProps) {
  return (
    <a href={to} className="btn no-underline bg-app-dark text-app-light">
      {label}
    </a>
  );
}

export default AuthPageSectionActionsBtn;
