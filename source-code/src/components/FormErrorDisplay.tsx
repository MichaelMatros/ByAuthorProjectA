import useForm from "@/hooks/useForm";
import React from "react";

function FormErrorDisplay() {
  const { hasError, errorMessage } = useForm();
  if (!hasError) {
    return <></>;
  }

  return (
    <div className="form__error-message">
      <span className="form__error-message--icon material-symbols-outlined">
        warning
      </span>
      <span className="form__error-message--text">{errorMessage}</span>
    </div>
  );
}

export default FormErrorDisplay;
