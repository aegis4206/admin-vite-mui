export interface SnackbBarOptionType {
  open: boolean;
  message?: string;
  severity?: "error" | "warning" | "info" | "success";
}

export interface AddressType {
  zipCode: string; // 郵遞區號
  county: string; // 縣市
  district: string; // 鄉鎮區
  address: string; // 地址
}
