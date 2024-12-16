export interface BaseResponse<T> {
  succeed: boolean,
  data: T,
  error?: Error
}