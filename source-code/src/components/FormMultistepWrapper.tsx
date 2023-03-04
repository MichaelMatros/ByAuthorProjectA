import { createClasses } from "@/utils";
import React from "react";

interface FormMultistepWrapperProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {}

function FormMultistepWrapper({
  children,
  className,
}: FormMultistepWrapperProps) {
  return (
    <div className={createClasses("form__multi-step", className)}>
      {children}
    </div>
  );
}

export default FormMultistepWrapper;
