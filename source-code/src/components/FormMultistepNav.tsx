import { useMultistep } from "@/hooks/useForm";
import React from "react";
import { OnIndexEndFn } from "./FormMultistepProvider";
import { createClasses } from "@/utils";

interface FormMultistepNavProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  direction: "start" | "end";
  hideOnDesktop?: boolean;
  onIndexEnd?: OnIndexEndFn;
}

function FormMultistepNav({
  direction,
  hideOnDesktop,
  className,
  onIndexEnd,
  onClick,
  ...btnProps
}: FormMultistepNavProps) {
  const { prevIndex, nextIndex } = useMultistep();

  function handleClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    onClick?.(e);

    switch (direction) {
      case "end":
        nextIndex(onIndexEnd);
        break;

      case "start":
        prevIndex(onIndexEnd);
        break;

      default:
        // unknown direction
        break;
    }
  }
  return (
    <button
      onClick={handleClick}
      className={createClasses(hideOnDesktop && "no-desktop", className)}
      type="button"
      {...btnProps}
    />
  );
}

export default FormMultistepNav;
