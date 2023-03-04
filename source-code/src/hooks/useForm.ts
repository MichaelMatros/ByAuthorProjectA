import {
  CustomValidationMessage,
  FormControlValidationRules,
  ValidationRuleKey,
} from "@/types/form";
import { FormContext } from "@components/Form";
import { FormMultistepContext } from "@components/FormMultistepProvider";
import { defined, match, otherwise, when } from "match-iz";
import {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { mixed, string, ValidationError } from "yup";

export default function useForm() {
  return useContext(FormContext);
}

export function useMultistep() {
  return useContext(FormMultistepContext);
}

function getValidationMessage(
  message:
    | null
    | boolean
    | CustomValidationMessage
    | ((...args: any[]) => any)
    | Record<any, any>,
  defaultMessage: string,
  value: unknown
) {
  if (message === true) {
    return defaultMessage;
  }

  if (message === false) {
    return null;
  }

  if (typeof message === "string") {
    return message;
  }

  if (typeof message === "object") {
    return match(message)(
      when({ message: defined }, () => {
        return message?.message(value, message?.value);
      }),
      otherwise(() => "Validation error occured!")
    );
  }

  return message?.(value as string) ?? null;
}

export function validate(rules: FormControlValidationRules, value: unknown) {
  for (const name in rules) {
    let rule = rules[name as ValidationRuleKey];

    const validation = match(name)(
      when("required", () => string().required()),
      when("email", () => string().email()),
      when("sameAs", () => {
        const rule = rules.sameAs ?? {
          value: null,
          message: (input, expected) =>
            `${input} must be the same as ${expected}`,
        };

        const message = rule.message?.(value, rule.value) as string;

        return mixed().test(
          "is-same",
          message,
          (value) => value === rules.sameAs?.value
        );
      }),
      when("oneOf", () => {
        const rule = rules.oneOf;

        if (!rule) {
          return mixed().required();
        }

        const message = rule.message?.(value, rule.list) as string;

        return mixed().test("one-of", message, (value) => {
          rule.list.includes((value as string) ?? "");
          for (const item of rule.list) {
            if ((value as string[]).includes(item)) {
              return true;
            }
          }

          return false;
        });
      }),
      otherwise(() => mixed().required())
    );

    try {
      validation.validateSync(value);
    } catch (e: unknown) {
      return getValidationMessage(
        rule ?? null,
        (e as ValidationError).message,
        value
      );
    }
  }

  return null;
}

export function useValidator(
  value: string | number | readonly string[],
  id: string,
  label: string,
  validation?: FormControlValidationRules
) {
  const [localErrorMessage, setLocalErrorMessage] = useState<null | string>(
    null
  );
  const lastValueRef = useRef(value);
  const { created, errors, addError, removeError, addInput, removeInput } =
    useForm();
  const errorMessage = useMemo(() => {
    if (created) {
      return errors[id] ?? null;
    }

    return localErrorMessage;
  }, [errors, localErrorMessage]);

  const doValidation = useCallback(() => {
    if (!validation) {
      return true;
    }

    const errorMessage = validate(validation, value);

    if (created) {
      if (errorMessage) {
        addError(id, errorMessage);
        return false;
      }

      removeError(id);
      return true;
    }

    setLocalErrorMessage(errorMessage);

    return !!errorMessage;
  }, [value, validation]);

  useEffect(() => {
    if (lastValueRef.current === value) {
      return;
    }

    lastValueRef.current = value;
    doValidation();
  }, [value]);

  useEffect(() => {
    return () => {
      removeError(id);
      removeInput(id);
    };
  }, []);

  useEffect(() => {
    if (!validation) {
      removeInput(id);
      return;
    }

    addInput(id, {
      value,
      validation,
      label,
    });
  }, [value, validation, label]);

  return {
    errorMessage,
    validate: doValidation,
  };
}
