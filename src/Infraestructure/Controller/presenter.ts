import { DefaultResponse } from "../../Domain/ClientPayloads/defaultResponse";

export interface Presenter<T> {
  execute(succeed: boolean, error?: Error, ...args: any[]): DefaultResponse<T>
}