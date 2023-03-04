import { FormInputProps } from "@/types/form";
import React, { useMemo, useRef, useState } from "react";
import FormInput from "./FormInput";

import iconVisible from "@assets/icon-visible.svg";
import iconInvisible from "@assets/icon-invisible.svg";

function FormInputPassword({ ...props }: Omit<FormInputProps, "type">) {
  const [type, setType] = useState("password");
  const icon = useMemo(
    () => (type === "password" ? iconInvisible : iconVisible),
    [type]
  );
  const inputRef = useRef<null | HTMLInputElement>(null);

  function toggleVisibility() {
    setType((type) => {
      inputRef.current?.focus();
      return type === "password" ? "text" : "password";
    });
  }

  return (
    <FormInput
      type={type}
      {...props}
      ref={inputRef}
      append={
        <img
          style={{ cursor: "pointer" }}
          src={icon}
          onClick={toggleVisibility}
          title="Toggle password visibility"
        />
      }
    />
  );
}

export default FormInputPassword;
