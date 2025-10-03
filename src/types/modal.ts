import { ReactNode } from "react";

export interface ModalFieldConfig {
  name: string;
  label: string;
  type:
    | "text"
    | "number"
    | "select"
    | "date"
    | "password"
    | "custom"
    | "address"
    | "selectWithRangeDate"
    | "divider";
  options?: { value: string | number; label: string }[];
  disabled?: boolean;
  validation?: ("isEmpty" | "isPositiveInteger" | "isNaturalNumber")[];
  param?: boolean;
  smGrid?: number;

  targetSelectValue?: string;
  startDate?: ModalFieldConfig;
  endDate?: ModalFieldConfig;
  // [key: string]: unknown;
}

export interface ModalMessageProps<T> {
  open: boolean;
  title?: string;
  onSubmit?: (event: React.FormEvent<HTMLFormElement>) => void;
  formData?: T;
  children?: ReactNode;
  onlySubmit?: boolean;
}
