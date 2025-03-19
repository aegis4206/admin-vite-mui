export interface ModalFieldConfig {
  name: string;
  label: string;
  type: "text" | "number" | "select" | "date" | "password" | "custom";
  options?: { value: string | number; label: string }[];
  disabled?: boolean;
  validation?: ("isEmpty" | "isPositiveInteger")[];
}
