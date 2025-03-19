export interface TableRow {
  id?: string | number;
  Id?: string | number;
  // [key: string]: unknown;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  errorCode?: number | string;
  [key: string]: unknown;
}
export interface FetchActionsType<T> {
  get: (param?: Record<string, string>) => Promise<ApiResponse<T>>;
  post: (body: T) => Promise<ApiResponse<T>>;
  put: (body: T) => Promise<ApiResponse<T>>;
  delete: (body: T) => Promise<ApiResponse<T>>;
}
