export interface ModalFieldConfig {
  name: string;
  label: string;
  type: "text" | "number" | "select" | "custom";
  options?: { value: string | number; label: string }[];
  disabled?: boolean;
}
