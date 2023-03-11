import React, { ReactNode } from "react";

interface DividerProps {
  children?: ReactNode;
}

function Divider({ children }: DividerProps) {
  return <div className="divider">{children ?? "or"}</div>;
}

export default Divider;
