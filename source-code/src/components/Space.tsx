import { createClasses } from "@/utils";
import React from "react";

interface SpaceProps {
  className?: string;
}
function Space({ className }: SpaceProps) {
  return <div className={createClasses("flex-auto", className)} />;
}

export default Space;
