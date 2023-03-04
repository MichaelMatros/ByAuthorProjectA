import { useMultistep } from "@/hooks/useForm";
import React, {
  FormEvent,
  ReactNode,
  createContext,
  useMemo,
  useState,
} from "react";
import { v4 as uuid } from "uuid";
import { validate } from "@/hooks/useForm";
import { FormControlValidationRules } from "@/types/form";

type FormErrors = Record<string, string>;
type FormInputProps = {
  label: string;
  value: string | number | readonly string[];
  validation: FormControlValidationRules;
};
type FormInputs = Record<string, FormInputProps>;
type AddErrorFn = (inputId: string, message: string) => void;
type RemoveErrorFn = (inputId: string) => void;

interface FormContext {
  created: boolean;
  disabled: boolean;
  errors: FormErrors;
  inputs: Record<string, FormInputProps>;
  hasError: boolean;
  errorMessage: null | string;
  /**
   * Keeps track of the last validation ID after each validation.
   * Child form controls can watch it for changes and re-validate their values
   */
  validationId: null | string;
  addError: AddErrorFn;
  addInput: (id: string, props: FormInputProps) => void;
  removeInput: (id: string) => void;
  removeError: RemoveErrorFn;
  /**
   * Triggers validation for all child form controls
   */
  validate?: () => Promise<boolean>;
}

interface FormProps {
  children: ReactNode;
  disabled?: boolean;
  className?: string;
  nextOnSubmit?: boolean;
  bailOnError?: boolean;
  errorDisplay?: "summary" | "firstError";
  onSubmit?: (e: FormEvent<HTMLFormElement>) => void;
}

const t = {
  value: "",
  validation: {},
};

const FormContext = createContext<FormContext>({
  created: false,
  disabled: false,
  errors: {},
  inputs: {},
  hasError: false,
  errorMessage: null,
  validationId: null,
  addError() {},
  addInput() {},
  removeInput() {},
  removeError() {},
});

function Form({
  children,
  disabled,
  nextOnSubmit,
  bailOnError,
  errorDisplay = "summary",
  onSubmit,
  ...formProps
}: FormProps) {
  const [validationId, setValidationId] = useState<null | string>(null);
  const [errors, setErrors] = useState<FormErrors>({});
  const [inputs, setInputs] = useState<FormInputs>({});
  const hasError = useMemo(() => Object.values(errors).length > 0, [errors]);
  const formDisabled = useMemo(() => !!disabled, [disabled]);
  const { isLastIndex, nextIndex } = useMultistep();
  const errorMessage = useMemo(() => {
    const inputsSummary = Object.keys(inputs)
      .filter((id) => !!errors[id])
      .map((id) => inputs[id].label)
      .join(", ");

    if (errorDisplay === "summary") {
      return "Check the correctness of " + inputsSummary;
    }

    // Ensuring that errors are returned in the order of their inputs
    for (const id in inputs) {
      if (errors[id]) {
        return errors[id];
      }
    }

    return null;
  }, [errors]);

  function addError(inputId: string, message: string) {
    setErrors((errors) => ({ ...errors, [inputId]: message }));
  }

  function removeError(inputId: string) {
    setErrors((errors) => {
      const _errors = { ...errors };
      delete _errors[inputId];
      return _errors;
    });
  }

  function addInput(id: string, props: FormInputProps) {
    setInputs((inputs) => ({ ...inputs, [id]: props }));
  }

  function removeInput(id: string) {
    setInputs((inputs) => {
      const _inputs = { ...inputs };
      delete _inputs[id];

      return _inputs;
    });
  }

  function validateInputs() {
    setValidationId(uuid());

    return new Promise<boolean>((resolve) => {
      let hasError = false;
      for (const id in inputs) {
        const { value, validation: validationRules } = inputs[id];

        const errorMessage = validate(validationRules, value);

        if (errorMessage) {
          hasError = true;
          addError(id, errorMessage);
        }
      }

      resolve(!hasError);
    });
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const hasError = !(await validateInputs());

    if (hasError || !validationId) {
      return;
    }

    if (!isLastIndex && nextOnSubmit) {
      nextIndex();
      return;
    }

    onSubmit?.(e);
  }

  return (
    <FormContext.Provider
      value={{
        created: true,
        disabled: formDisabled,
        errors,
        hasError,
        errorMessage,
        validationId,
        inputs,
        addInput,
        removeInput,
        addError,
        removeError,
        validate: validateInputs,
      }}
    >
      <form onSubmit={handleSubmit} {...formProps}>
        {children}
      </form>
    </FormContext.Provider>
  );
}

export { FormContext };
export default Form;
