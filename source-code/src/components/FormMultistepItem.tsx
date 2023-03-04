import { useMultistep } from "@/hooks/useForm";
import { createClasses } from "@/utils";
import React, { ReactNode, useEffect, useMemo, useRef } from "react";
import { v4 as uuid } from "uuid";

interface FormMultistepItemProps {
  children: ReactNode;
  className?: string;
}

function FormMultistepItem({ children, className }: FormMultistepItemProps) {
  const idRef = useRef(uuid());
  const { steps, currentIndex, addStep, removeStep } = useMultistep();
  const currentStep = useMemo(() => steps[idRef.current], [steps]);
  const showCurrentStep = useMemo(
    () => currentStep === currentIndex,
    [currentIndex, currentStep]
  );

  useEffect(() => {
    addStep(idRef.current);
    return () => {
      removeStep(idRef.current);
    };
  }, []);

  if (!showCurrentStep) {
    return <></>;
  }

  return (
    <div className={createClasses("form__multi-step--item", className)}>
      {children}
    </div>
  );
}

export default FormMultistepItem;
