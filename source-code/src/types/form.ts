export type CustomValidationMessage<FieldType = string> =
  | string
  | ((value: FieldType) => string);

export type FormControlValidationRules = {
  required?: boolean | CustomValidationMessage;
  email?: boolean | CustomValidationMessage;
  sameAs?: {
    value: unknown;
    message?: (input: unknown, expected: unknown) => string;
  };
  oneOf?: {
    list: string[];
    message?: (input: unknown, list: string[]) => string;
  };
};

export type ValidationRuleKey = keyof FormControlValidationRules;

export interface FormControlProps {
  validation?: FormControlValidationRules;
}

export interface FormBtnProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  label?: string;
  loading?: boolean;
  loadingText?: string;
  disableOnError?: boolean;
  /** Validate parent `Form` when this button is clicked */
  validate?: boolean;
  /** Navigate to the next step when clicked in a multi-step form */
  next?: boolean;
  icon?: JSX.Element;
  hover?: boolean;
}

export type FormInputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> &
  FormControlProps & {
    label?: string;
    labelAfter?: boolean;
    showError?: boolean;
    onChange?: (e: string) => void;
    onChangeOriginal?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  };
