import { BaseResponse } from "../../Domain/ClientPayloads/baseResponse";

export interface Presenter<T> {
  present(succeed: boolean, error?: Error, ...args: any[]): BaseResponse<T>
}