import React from "react";
import { FormBtnProps } from "@/types/form";
import FormBtn from "./FormBtn";

interface FormBtnSubmitProps extends Omit<FormBtnProps, "disableOnError"> {}

function FormBtnSubmit({ ...props }: FormBtnSubmitProps) {
  return <FormBtn {...props} type="submit" disableOnError />;
}

export default FormBtnSubmit;
