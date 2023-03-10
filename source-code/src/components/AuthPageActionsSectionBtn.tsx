import React from "react";

interface AuthPageActionsSectionBtnProps {
  to?: string;
  label: string;
}

function AuthPageActionsSectionBtn({
  to,
  label,
}: AuthPageActionsSectionBtnProps) {
  return (
    <a href={to} className="btn no-underline bg-app-dark text-app-light">
      {label}
    </a>
  );
}

export default AuthPageActionsSectionBtn;
