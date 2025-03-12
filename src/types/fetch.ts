export interface TableRow {
  id?: string | number;
  Id?: string | number;
  // [key: string]: unknown;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  error_code?: number;
}
export interface FetchActionsType<T> {
  get: () => Promise<ApiResponse<T>>;
  post: (body: Record<string, unknown>) => Promise<ApiResponse<T>>;
}
