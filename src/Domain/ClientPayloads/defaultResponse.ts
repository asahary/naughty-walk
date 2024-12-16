export interface DefaultResponse<T> {
  succeed: boolean,
  data: T,
  error?: Error
}