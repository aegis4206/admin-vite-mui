export interface SnackbBarOptionType {
  open: boolean;
  message?: string;
  severity?: 'error' | 'warning' | 'info' | 'success';
}