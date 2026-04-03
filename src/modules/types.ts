/** Shared pagination wrapper */
export interface Paginated<T> {
  data: T[];
  total: number;
  page: number;
  perPage: number;
}

/** Generic API response */
export interface ApiResponse<T = void> {
  success: boolean;
  message?: string;
  data?: T;
}
